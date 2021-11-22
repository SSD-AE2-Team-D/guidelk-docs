package com.guidelk.tourism.controller;

import com.guidelk.tourism.auth.payload.request.AuthRequest;
import com.guidelk.tourism.auth.payload.request.LogOutRequest;
import com.guidelk.tourism.auth.payload.request.TokenRefreshRequest;
import com.guidelk.tourism.service.JwtLoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/auth")
public class JwtLoginController {
    private final JwtLoginService jwtLoginService;

    @Autowired
    public JwtLoginController(JwtLoginService jwtLoginService) {
        this.jwtLoginService = jwtLoginService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@Valid @RequestBody AuthRequest authRequest) {
        return this.jwtLoginService.authenticate(authRequest);
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<?> refreshToken(@Valid @RequestBody TokenRefreshRequest tokenRefreshRequest) {
        return this.jwtLoginService.refreshToken(tokenRefreshRequest);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@Valid @RequestBody LogOutRequest logOutRequest) {
        return this.jwtLoginService.logout(logOutRequest);
    }
}
