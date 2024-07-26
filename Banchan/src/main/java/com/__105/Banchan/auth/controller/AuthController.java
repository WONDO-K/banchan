package com.__105.Banchan.auth.controller;

import com.__105.Banchan.auth.dto.StatusResponseDto;
import com.__105.Banchan.auth.dto.TokenResponseStatus;
import com.__105.Banchan.auth.jwt.GeneratedToken;
import com.__105.Banchan.auth.jwt.JwtUtil;
import com.__105.Banchan.redis.domain.RefreshToken;
import com.__105.Banchan.redis.repository.RefreshTokenRepository;
import com.__105.Banchan.redis.service.RefreshTokenService;
import com.__105.Banchan.user.domain.User;
import com.__105.Banchan.user.enums.Role;
import com.__105.Banchan.user.repository.UserRepository;
import com.__105.Banchan.user.service.dto.SignupRequestDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "*")
@Controller
@RequiredArgsConstructor
@RequestMapping("/api/auth")
@Tag(name = "AuthController", description = "인증 관련 API")
public class AuthController {

    private final RefreshTokenRepository tokenRepository;
    private final RefreshTokenService tokenService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    @PostMapping("/token/logout")
    @Operation(summary = "로그아웃", description = "로그아웃 처리 및 토큰 삭제")
    public ResponseEntity<StatusResponseDto> logout(@RequestHeader("Authorization") final String accessToken) {
        tokenService.removeRefreshToken(accessToken);
        return ResponseEntity.ok(StatusResponseDto.addStatus(200));
    }

    @PostMapping("/token/refresh")
    @Operation(summary = "토큰 갱신", description = "액세스 토큰 갱신")
    public ResponseEntity<TokenResponseStatus> refresh(@RequestHeader("Authorization") final String accessToken) {
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

    @GetMapping("/loginSuccess")
    @Operation(summary = "로그인 성공", description = "로그인 성공 후 리다이렉트 처리")
    public String loginSuccess(@RequestParam("accessToken") String accessToken, Model model) {
        model.addAttribute("accessToken", accessToken);
        return "loginSuccess";
    }

    @GetMapping("/signup")
    @Operation(summary = "회원가입 페이지", description = "회원가입 페이지 요청")
    public ResponseEntity<Map<String, String>> signup(@RequestParam("signupToken") String signupToken) {
        if (jwtUtil.verifyToken(signupToken)) {
            String email = jwtUtil.getUid(signupToken);
            String provider = jwtUtil.getProviderFromToken(signupToken);

            Map<String, String> response = new HashMap<>();
            response.put("email", email);
            response.put("provider", provider);
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().build();
    }

    @PostMapping("/signup")
    @Operation(summary = "회원가입 처리", description = "회원가입 정보 제출 및 사용자 등록")
    public ResponseEntity<Map<String, String>> handleSignup(@RequestParam("signupToken") String signupToken,
                                                            @RequestBody SignupRequestDto signupRequest) {
        if (jwtUtil.verifyToken(signupToken)) {
            String email = jwtUtil.getUid(signupToken);
            String provider = jwtUtil.getProviderFromToken(signupToken);

            User user = User.builder()
                    .email(email)
                    .provider(provider)
                    .realname(signupRequest.getRealname())
                    .phone(signupRequest.getPhone())
                    .passwordHash("")
                    .role(Role.USER)
                    .createdAt(LocalDateTime.now())
                    .isActive(true)
                    .attributeKey(signupRequest.getAttributeKey()) // attributeKey 저장
                    .build();

            userRepository.save(user);

            GeneratedToken token = jwtUtil.generateToken(email, Role.USER);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Signup successful! Here is your access token.");
            response.put("accessToken", token.getAccessToken());

            return ResponseEntity.ok(response);
        }
        return ResponseEntity.badRequest().build();
    }

//    @GetMapping("/api_test")
//    public String apiTestPage() {
//        return "api_test"; // api_test.html 파일을 제공
//    }

}
