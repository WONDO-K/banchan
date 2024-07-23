package com.__105.Banchan.auth.jwt;

import com.__105.Banchan.auth.dto.SecurityUserDto;
import com.__105.Banchan.auth.exception.JwtException;
import com.__105.Banchan.user.domain.User;
import com.__105.Banchan.user.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;





@RequiredArgsConstructor
@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final Logger log = LoggerFactory.getLogger(getClass());

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // request      Header에서 AccessToken을 가져온다.
        String accessToken = request.getHeader("Authorization");

        // 토큰 검사 생략(모두 허용 URL의 경우 토큰 검사 통과)
        if (!StringUtils.hasText(accessToken)){
            doFilter(request,response,filterChain);
            return;
        }

        // AccessToken을 검증하고, 만료되었을 경우 예외 발새
        if (!jwtUtil.verifyToken(accessToken)){
            throw new JwtException("Access Token 만료!");
        }
        
        // AccessToken의 값이 있고, 유효한 경우 진행
        if (jwtUtil.verifyToken(accessToken)) {

            // AccessToken 내부의 payload에 있는 email로 user를 조회한다. 없다면 예외 발생
            User findUser = userRepository.findByEmail(jwtUtil.getUid(accessToken))
                    .orElseThrow(IllegalStateException::new); // 사용자가 값을 제대로 입력했지만, 개발자 코드가 값을 처리할 준비가 안된 경우에 발생한다.

            // SecurityContext에 등록할 User 객체를 만들어 준다.
            SecurityUserDto userDto = SecurityUserDto.builder()
                    .id(findUser.getId())
                    .email(findUser.getEmail())
                    .role(findUser.getRole())
                    .build();
            
            // SecurityContext에 인증 객체 등록
            Authentication auth = getAuthentication(userDto);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        filterChain.doFilter(request,response);

    }

    public Authentication getAuthentication(SecurityUserDto user) {
        // Role enum을 String으로 변환하여 SimpleGrantedAuthority 객체 생성
        return new UsernamePasswordAuthenticationToken(user, "",
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getRole().name())));
    }

    public static SecurityUserDto getUser(){
        return (SecurityUserDto) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException{
        return request.getRequestURI().contains("token/");
    }
}
