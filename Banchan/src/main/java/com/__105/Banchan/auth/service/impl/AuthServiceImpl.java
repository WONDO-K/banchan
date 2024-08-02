package com.__105.Banchan.auth.service.impl;

import com.__105.Banchan.auth.dto.KakaoTokenDto;
import com.__105.Banchan.auth.dto.KakaoUserInfoDto;
import com.__105.Banchan.auth.dto.StatusResponseDto;
import com.__105.Banchan.auth.dto.TokenResponseStatus;
import com.__105.Banchan.auth.dto.login.OriginLoginRequestDto;
import com.__105.Banchan.auth.jwt.GeneratedToken;
import com.__105.Banchan.auth.jwt.JwtUtil;
import com.__105.Banchan.auth.service.AuthService;
import com.__105.Banchan.common.exception.CustomException;
import com.__105.Banchan.common.exception.ErrorCode;
import com.__105.Banchan.redis.domain.RefreshToken;
import com.__105.Banchan.redis.repository.RefreshTokenRepository;
import com.__105.Banchan.redis.service.RefreshTokenService;
import com.__105.Banchan.user.domain.User;
import com.__105.Banchan.user.enums.Role;
import com.__105.Banchan.user.repository.UserRepository;
import com.__105.Banchan.util.GenerateRandomPassword;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final RefreshTokenRepository tokenRepository;
    private final RefreshTokenService tokenService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final RestTemplate restTemplate = new RestTemplate(); // RestTemplate 빈 초기화
    private final ObjectMapper objectMapper;

    @Value("${kakao.client-id}")
    private String clientId;

    @Value("${kakao.redirect-uri}")
    private String redirectUri;

    @Value("${kakao.token-uri}")
    private String tokenUri;

    @Value("${kakao.user-info-uri}")
    private String userInfoUri;

    @Value("${kakao.client-secret}")
    private String clientSecret;

    @Override
    public ResponseEntity<StatusResponseDto> logout(String accessToken) {
        tokenService.removeRefreshToken(accessToken);
        return ResponseEntity.ok(StatusResponseDto.addStatus(200));
    }

    @Override
    public ResponseEntity<TokenResponseStatus> refresh(String accessToken) {
        Optional<RefreshToken> refreshToken = tokenRepository.findByAccessToken(accessToken);

        if (refreshToken.isPresent() && jwtUtil.verifyToken(refreshToken.get().getRefreshToken())) {
            RefreshToken resultToken = refreshToken.get();
            String newAccessToken = jwtUtil.generateAccessToken(resultToken.getId(), jwtUtil.getRole(resultToken.getRefreshToken()));
            resultToken.updateAccessToken(newAccessToken);
            tokenRepository.save(resultToken);
            return ResponseEntity.ok(TokenResponseStatus.addStatus(200, newAccessToken));
        }

        return ResponseEntity.badRequest().body(TokenResponseStatus.addStatus(400, null));
    }

    @Override
    public ResponseEntity<Map<String, String>> originLogin(OriginLoginRequestDto loginRequestDto) {
        Optional<User> user = userRepository.findByEmail(loginRequestDto.getUserId());

        if (user.isEmpty()) {
            throw new CustomException(ErrorCode.USER_NOT_FOUND);
        }

        if (!loginRequestDto.getPasswordHash().equals(user.get().getPasswordHash())) {
            log.error("비밀번호가 올바르지 않습니다.");
            throw new BadCredentialsException("비밀번호가 올바르지 않습니다.");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequestDto.getUserId());
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);

        log.info("Authentication successful: {}", authenticationToken);

        GeneratedToken token = jwtUtil.generateToken(loginRequestDto.getUserId(), user.get().getRole());
        log.info("Generated Token: {}", token);

        Map<String, String> response = new HashMap<>();
        response.put("message", "Login successful! Here is your access token.");
        response.put("accessToken", token.getAccessToken());

        return ResponseEntity.ok(response);
    }

    @Override
    public KakaoUserInfoDto requestAccessTokenAndUserInfo(String code) {
        // 카카오 액세스 토큰 요청을 위한 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 카카오 액세스 토큰 요청을 위한 바디 설정
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);
        body.add("redirect_uri", redirectUri);
        body.add("code", code);

        // 카카오 액세스 토큰 요청
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);
        ResponseEntity<String> response;
        try {
            response = restTemplate.postForEntity(tokenUri, request, String.class);
        } catch (Exception e) {
            log.error("카카오 액세스 토큰 요청 실패", e);
            throw new CustomException(ErrorCode.KAKAO_TOKEN_REQUEST_FAILED);
        }

        log.info("카카오 액세스 토큰 요청: {}", request);

        // Json으로 파싱
        // ObjectMapper objectMapper = new ObjectMapper();
        KakaoTokenDto kakaoTokenDto;
        try {
            kakaoTokenDto = objectMapper.readValue(response.getBody(), KakaoTokenDto.class);
        } catch (JsonProcessingException e) {
            log.error("카카오 액세스 토큰 파싱 실패", e);
            throw new CustomException(ErrorCode.KAKAO_TOKEN_PARSING_FAILED);
        }

        // 액세스 토큰을 통해 사용자 정보 요청
        if (kakaoTokenDto != null) {
            return requestUserInfo(kakaoTokenDto.getAccessToken());
        } else {
            log.error("카카오 사용자 정보를 가져오는 데 실패했습니다.");
            throw new CustomException(ErrorCode.KAKAO_USER_INFO_NOT_FOUND);
        }
    }

    @Override
    public User kakaoRegisterOrLoginUser(String userEmail) {
        try {
            Optional<User> userOptional = userRepository.findByEmail(userEmail);

            User user;
            if (userOptional.isPresent()) {
                // 로그인 처리
                user = userOptional.get();
                log.info("로그인 처리: {}", user);
            } else {
                // 회원가입 처리
                user = User.builder()
                        .email(userEmail)
                        .username(userEmail)
                        .passwordHash(passwordEncoder.encode(GenerateRandomPassword.createRandomPassword())) // 소셜 로그인에서는 사용하지 않는 값 -> 랜덤 값 삽입
                        .role(Role.USER)
                        .socialType("kakao")
                        .attributeKey("")
                        .createdAt(LocalDateTime.now())
                        .build();
                userRepository.save(user);
                log.info("회원가입 처리: {}", user);
            }

            // 토큰 생성 (액세스, 리프레쉬)
            return user;
        } catch (Exception e) {
            log.error("회원가입 또는 로그인 처리 중 오류 발생", e);
            throw new CustomException(ErrorCode.LOGIN_OR_REGISTER_FAILED);
        }
    }
    // 쿠키에 리프레시 토큰 저장
    @Override
    public GeneratedToken handleKakaoLoginSuccess(String email, HttpServletResponse response) {
        User user = kakaoRegisterOrLoginUser(email);
        GeneratedToken token = jwtUtil.generateToken(user.getEmail(), user.getRole());

        // 리프레시 토큰을 쿠키에 저장 (1시간 동안 유효)
        Cookie refreshTokenCookie = new Cookie("refreshToken", token.getRefreshToken());
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(60 * 60); // 1시간
        response.addCookie(refreshTokenCookie);

        return token;
    }


    // 액세스 토큰으로 유저 정보 요청
    private KakaoUserInfoDto requestUserInfo(String accessToken) {
        try {
            // 카카오 유저 정보 요청을 위한 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + accessToken);
            headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

            // 사용자 정보 요청
            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(
                    userInfoUri,
                    HttpMethod.GET,
                    request,
                    String.class
            );
            log.info("카카오로부터 받은 사용자 정보: {}", response.getBody());

            // Json으로 파싱
//            ObjectMapper objectMapper = new ObjectMapper();

            // 카카오로부터 받은 사용자 정보를 KakaoUserInfoDto로 변환
            return objectMapper.readValue(response.getBody(), KakaoUserInfoDto.class);

        } catch (JsonProcessingException e) {
            log.error("카카오 사용자 정보 파싱 실패", e);
            throw new CustomException(ErrorCode.KAKAO_USER_INFO_PARSING_FAILED);
        } catch (Exception e) {
            log.error("카카오 사용자 정보 요청 실패", e);
            throw new CustomException(ErrorCode.KAKAO_USER_INFO_REQUEST_FAILED);
        }
    }

}
