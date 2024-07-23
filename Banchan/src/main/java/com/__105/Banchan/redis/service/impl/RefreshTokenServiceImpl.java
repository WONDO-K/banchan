package com.__105.Banchan.redis.service.impl;

import com.__105.Banchan.redis.domain.RefreshToken;
import com.__105.Banchan.redis.repository.RefreshTokenRepository;
import com.__105.Banchan.redis.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    @Override
    public void saveTokenInfo(String email, String refreshToken, String accessToken) {
        refreshTokenRepository.save(new RefreshToken(email, accessToken, refreshToken));
    }

    @Override
    public void removeRefreshToken(String accessToken) {
        RefreshToken refreshToken = refreshTokenRepository.findByAccessToken(accessToken)
                .orElseThrow(IllegalArgumentException::new); // IllegalArgumentException를 발생시키기 위해 Optional 사용 x
        refreshTokenRepository.delete(refreshToken);
    }
}
