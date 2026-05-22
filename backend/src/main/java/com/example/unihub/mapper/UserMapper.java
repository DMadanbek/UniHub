package com.example.unihub.mapper;

import com.example.unihub.dto.UserProfileResponse;
import com.example.unihub.dto.UserRequest;
import com.example.unihub.entity.User;

public interface UserMapper {

    User toEntity(UserRequest request);
    User updateEntity(User user, UserRequest request);
    UserProfileResponse toDto(User user);
}