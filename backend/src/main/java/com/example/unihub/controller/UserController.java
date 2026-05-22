package com.example.unihub.controller;

import com.example.unihub.dto.UserProfileResponse;
import com.example.unihub.dto.UserRequest;
import com.example.unihub.dto.auth.Login;
import com.example.unihub.entity.User;
import com.example.unihub.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    @Operation(summary = "Register user")
    public ResponseEntity<String> register(
            @RequestBody UserRequest request
    ) {

        userService.register(request);

        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    @Operation(summary = "Login user")
    public ResponseEntity<String> login(
            @RequestBody Login login
    ) {

        String token = userService.login(login);

        return ResponseEntity.ok(token);
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/my-profile")
    @Operation(summary = "Get my profile")
    public ResponseEntity<UserProfileResponse> getMyProfile(

            @AuthenticationPrincipal User user

    ) {

        UserProfileResponse response = userService.getProfile(
                user.getId()
        );

        return ResponseEntity.ok(response);
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/edit-profile")
    @Operation(summary = "Edit profile")
    public ResponseEntity<UserProfileResponse> updateProfile(

            @AuthenticationPrincipal User user,

            @RequestBody UserRequest request

    ) {

        UserProfileResponse response = userService.updateProfile(
                user.getId(),
                request
        );

        return ResponseEntity.ok(response);
    }
}