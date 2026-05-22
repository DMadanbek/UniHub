package com.example.unihub.service;

import com.example.unihub.dto.UserProfileResponse;
import com.example.unihub.dto.UserRequest;
import com.example.unihub.dto.auth.Login;
import com.example.unihub.entity.User;

public interface UserService {

    void register(UserRequest request);

    String login(Login login);

    UserProfileResponse getProfile(Long userId);

    UserProfileResponse updateProfile(Long userId, UserRequest request);

    User getUserEntity(Long userId);
}