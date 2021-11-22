package com.guidelk.tourism.service;

import com.guidelk.tourism.auth.payload.request.AuthRequest;
import com.guidelk.tourism.auth.payload.request.LogOutRequest;
import com.guidelk.tourism.auth.payload.request.TokenRefreshRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public interface JwtLoginService {
    ResponseEntity<?> authenticate(AuthRequest authRequest);

    ResponseEntity<?> refreshToken(TokenRefreshRequest tokenRefreshRequest);

    ResponseEntity<?> logout(LogOutRequest logOutRequest);
}
