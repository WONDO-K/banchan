package com.__105.Banchan.auth.config;

import com.__105.Banchan.auth.handler.MyAuthenticationFailureHandler;
import com.__105.Banchan.auth.handler.MyAuthenticationSuccessHandler;
import com.__105.Banchan.auth.jwt.JwtAuthFilter;
import com.__105.Banchan.auth.jwt.JwtExceptionFilter;
import com.__105.Banchan.auth.service.CustomOAuth2UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.config.annotation.web.configurers.HttpBasicConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.ClientRegistration;

import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig{

    private final MyAuthenticationSuccessHandler oAuth2LoginSuccessHandler;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final JwtAuthFilter jwtAuthFilter;
    private final MyAuthenticationFailureHandler oAuth2LoginFailureHandler;
    private final JwtExceptionFilter jwtExceptionFilter;

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost"); // 모든 출처 허용
        config.addAllowedHeader("*"); // 모든 헤더 허용
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // 모든 메소드 허용

        // 모든 URL 패턴에 대해 위의 CORS 설정을 적용
        source.registerCorsConfiguration("/**", config);
        return source;
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .httpBasic(HttpBasicConfigurer::disable) // HTTP 기본 인증을 비활성화
                .csrf(CsrfConfigurer::disable) // CSRF 보호 기능 비활성화
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // CORS 활성화
                .formLogin(AbstractHttpConfigurer::disable) // form 로그인 비활성화
                .sessionManagement(configure -> configure.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // 세션 관리 정책을 STATELESS로 설정
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/api/auth/token/refresh").hasRole("USER") // USER 권한이 필요한 상황을 먼저 설정
                        .requestMatchers("/api/auth/**").permitAll() // 나머지 /token/** 경로와 /loginSuccess 경로는 모두 허용
                        .requestMatchers("/api/v1/**").authenticated()
                        .requestMatchers("/", "/css/**", "/images/**", "/js/**", "/favicon.ico", "/h2-console/**").permitAll() // 기타 경로는 모두 허용
                        .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll() // Swagger 관련 경로 모두 허용
                        .anyRequest().authenticated() // 그 외의 모든 요청은 인증이 필요함
                )
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(userInfo -> userInfo.userService(customOAuth2UserService)) // OAuth2 로그인 시 사용자 정보를 가져오는 엔드포인트와 사용자 서비스 설정
                        .failureHandler(oAuth2LoginFailureHandler) // OAuth2 로그인 실패 시 처리할 핸들러 지정
                        .successHandler(oAuth2LoginSuccessHandler) // OAuth2 로그인 성공 시 처리할 핸들러 지정
                );

        // JWT 인증 필터를 UsernamePasswordAuthenticationFilter 앞에 추가
        return http
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .addFilterBefore(jwtExceptionFilter, JwtAuthFilter.class)
                .build();
    }
}
