package com.__105.Banchan.redis.service.impl;

import com.__105.Banchan.common.exception.CustomException;
import com.__105.Banchan.common.exception.ErrorCode;
import com.__105.Banchan.redis.domain.RefreshToken;
import com.__105.Banchan.redis.repository.RefreshTokenRepository;
import com.__105.Banchan.redis.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final Logger log = LoggerFactory.getLogger(getClass());

    @Override
    public void saveTokenInfo(String email, String refreshToken, String accessToken) {
        try {
            refreshTokenRepository.save(new RefreshToken(email, accessToken, refreshToken));
            log.info("RefreshToken 저장 완료. email={}, accessToken={}", email, accessToken);
        } catch (Exception e) {
            log.error("RefreshToken 저장 실패. email={}, accessToken={}, error={}", email, accessToken, e.getMessage(), e);
            throw new CustomException(ErrorCode.REDIS_TOKEN_CREATE_FAILED);
        }
    }

    @Override
    public void removeRefreshToken(String accessToken) {
        RefreshToken refreshToken = refreshTokenRepository.findByAccessToken(accessToken)
                .orElseThrow(() -> {
                    log.error("리프레시 토큰을 찾을 수 없습니다. accessToken={}", accessToken);
                    return new CustomException(ErrorCode.REDIS_REFRESH_TOKEN_NOT_FOUND);
                });
        refreshTokenRepository.delete(refreshToken);
        log.info("RefreshToken 삭제 완료. accessToken={}", accessToken);
    }
}