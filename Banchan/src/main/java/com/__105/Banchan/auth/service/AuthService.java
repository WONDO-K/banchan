package com.__105.Banchan.auth.service;

import com.__105.Banchan.auth.dto.KakaoUserInfoDto;
import com.__105.Banchan.auth.dto.StatusResponseDto;
import com.__105.Banchan.auth.dto.TokenResponseStatus;

import com.__105.Banchan.auth.dto.login.OriginLoginRequestDto;
import com.__105.Banchan.auth.jwt.GeneratedToken;
import com.__105.Banchan.user.domain.User;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface AuthService {
    ResponseEntity<StatusResponseDto> logout(String accessToken);
    ResponseEntity<TokenResponseStatus> refresh(String accessToken);
    ResponseEntity<Map<String, String>> originLogin(OriginLoginRequestDto loginRequestDto);
    KakaoUserInfoDto requestAccessTokenAndUserInfo(String code);
    GeneratedToken handleKakaoLoginSuccess(String email, HttpServletResponse response);

    User kakaoRegisterOrLoginUser(String userEmail);
}
