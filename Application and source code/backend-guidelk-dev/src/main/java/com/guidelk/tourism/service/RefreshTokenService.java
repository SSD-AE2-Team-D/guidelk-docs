package com.guidelk.tourism.service;

import com.guidelk.tourism.entity.RefreshToken;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public interface RefreshTokenService {
    RefreshToken createRefreshToken(Integer userId);

    RefreshToken verifyExpiration(RefreshToken token);

    Optional<RefreshToken> findByToken(String token);

    void deleteByUserId(Integer userId);
}
