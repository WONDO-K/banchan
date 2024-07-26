package com.__105.Banchan.auth.handler;

import com.__105.Banchan.auth.jwt.GeneratedToken;
import com.__105.Banchan.auth.jwt.JwtUtil;
import com.__105.Banchan.user.enums.Role;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

/*
 * OAuth2 인증이 성공했을 경우, 성공 후 처리를 위한 클래스.
 */

@Component
@RequiredArgsConstructor
public class MyAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final JwtUtil jwtUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        // OAuth2User로 캐스팅하여 인증된 사용자 정보를 가져온다.
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        // 사용자 이메일을 가져온다.
        String email = oAuth2User.getAttribute("email");
        // 서비스 제공 플랫폼(GOOGLE, KAKAO, NAVER)이 어디인지 가져온다.
        String provider = oAuth2User.getAttribute("provider");

        // CustomOAuth2UserService에서 셋팅한 로그인한 회원 존재 여부를 가져온다.
        boolean isExist = oAuth2User.getAttribute("exist");

        // OAuth2User로부터 Role을 얻어온다.
        Optional<Role> roleOptional = oAuth2User.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)  // GrantedAuthority 객체에서 권한 문자열을 추출
                .map(this::convertStringToRole)       // 권한 문자열을 Role enum으로 변환
                .findFirst();                         // 첫 번째 Role을 가져옴

        Role role = roleOptional.orElseThrow(IllegalAccessError::new);

        if (isExist) {
            GeneratedToken token = jwtUtil.generateToken(email, role);
            log.info("jwtToken = {}", token.getAccessToken());

            String targetUrl = UriComponentsBuilder.fromUriString("http://localhost/api/auth/loginSuccess")
                    .queryParam("accessToken", token.getAccessToken())
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString();
            log.info("redirect 준비");
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        } else {
            // 수정된 부분: signupToken 생성 후 URL로 전달
            String signupToken = jwtUtil.generateTokenForSignup(email, provider);
            String targetUrl = UriComponentsBuilder.fromUriString("http://localhost/api/auth/signup")
                    .queryParam("signupToken", signupToken)
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString();
            getRedirectStrategy().sendRedirect(request, response, targetUrl);
        }
    }

    /**
     * 문자열 권한을 Role enum으로 변환하는 메소드
     *
     * Spring Security에서 사용자의 권한 정보는 GrantedAuthority 인터페이스를 통해 표현된다.
     * 이 권한 정보는 문자열 형태로 저장되는데, 우리의 유저는 enum 타입으로 사용하기 때문에 이 문자열을 Role enum으로 변환하여 사용.
     * Role enum은 시스템 내에서 권한을 더 안전하고 일관성 있게 관리할 수 있게 해준다.
     * 이 메소드는 문자열 권한을 Role enum으로 변환. 변환이 실패할 경우 로그에 에러 메시지를 기록하고 예외를 던진다.
     *
     * @param authority 권한이 담긴 문자열
     * @return 변환된 Role enum
     * @throws IllegalAccessError 권한 문자열이 Role enum과 일치하지 않을 경우 예외 발생
     */
    private Role convertStringToRole(String authority) {
        try {
            return Role.valueOf(authority);  // 권한 문자열을 Role enum으로 변환
        } catch (IllegalArgumentException e) {
            log.error("Unknown role: {}", authority);  // 권한 문자열이 Role enum과 일치하지 않을 경우 로그에 에러 메시지 기록
            throw new IllegalAccessError("Unknown role: " + authority);  // 예외 발생
        }
    }
}
