package com.guidelk.tourism.serviceimpl;

import com.guidelk.tourism.auth.exception.TokenRefreshException;
import com.guidelk.tourism.auth.payload.request.AuthRequest;
import com.guidelk.tourism.auth.payload.request.LogOutRequest;
import com.guidelk.tourism.auth.payload.request.TokenRefreshRequest;
import com.guidelk.tourism.auth.payload.response.JwtResponse;
import com.guidelk.tourism.auth.payload.response.MessageResponse;
import com.guidelk.tourism.auth.payload.response.TokenRefreshResponse;
import com.guidelk.tourism.auth.security.jwt.JwtUtils;
import com.guidelk.tourism.entity.RefreshToken;
import com.guidelk.tourism.entity.User;
import com.guidelk.tourism.repository.UserRepository;
import com.guidelk.tourism.service.JwtLoginService;
import com.guidelk.tourism.service.RefreshTokenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class JwtLoginServiceImpl implements JwtLoginService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final RefreshTokenService refreshTokenService;

    private final Logger logger = LoggerFactory.getLogger(JwtLoginServiceImpl.class);


    @Autowired
    public JwtLoginServiceImpl(AuthenticationManager authenticationManager,
                               JwtUtils jwtUtils,
                               UserRepository userRepository,
                               RefreshTokenService refreshTokenService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
        this.refreshTokenService = refreshTokenService;
    }

    @Override
    public ResponseEntity<?> authenticate(AuthRequest authRequest) {
        try {
           this.authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword()));
        } catch (Exception e) {
            logger.error(e.getMessage());
        }

        String jwt = jwtUtils.generateJwtToken(authRequest.getUserName());
        User user = this.userRepository.findByUserNameIgnoreCaseAndEnabled(authRequest.getUserName(), true);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getUserId());

        return ResponseEntity.ok(new JwtResponse(jwt, refreshToken.getToken(), user.getUserId(),
                user.getUserName(), user.getEmail()));

    }

    @Override
    public ResponseEntity<?> refreshToken(TokenRefreshRequest tokenRefreshRequest) {
        String requestRefreshToken = tokenRefreshRequest.getRefreshToken();

        return refreshTokenService.findByToken(requestRefreshToken)
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUser)
                .map(user -> {
                    String token = jwtUtils.generateTokenFromUsername(user.getUserName());
                    return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
                })
                .orElseThrow(() -> new TokenRefreshException(requestRefreshToken,
                        "Refresh token is not in database!"));
    }

    @Override
    public ResponseEntity<?> logout(LogOutRequest logOutRequest) {
        this.refreshTokenService.deleteByUserId(logOutRequest.getUserId());
        return ResponseEntity.ok(new MessageResponse("Log out successful!"));
    }


}
