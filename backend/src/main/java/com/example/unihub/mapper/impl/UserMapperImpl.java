package com.example.unihub.mapper.impl;

import com.example.unihub.dto.UserProfileResponse;
import com.example.unihub.dto.UserRequest;
import com.example.unihub.entity.User;
import com.example.unihub.mapper.TagMapper;
import com.example.unihub.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapperImpl implements UserMapper {

    private final TagMapper tagMapper;

    @Override
    public User toEntity(UserRequest request) {

        User user = new User();

        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword());
        user.setEmail(request.getEmail());
        user.setAcademicGroup(request.getAcademicGroup());

        if (request.getTagIds() != null) {
            user.setTags(
                    tagMapper.toEntities(request.getTagIds())
            );
        }

        return user;
    }

    @Override
    public User updateEntity(User user, UserRequest request) {

        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setAcademicGroup(request.getAcademicGroup());

        if (request.getTagIds() != null) {
            user.setTags(
                    tagMapper.toEntities(request.getTagIds())
            );
        }

        return user;
    }

    @Override
    public UserProfileResponse toDto(User user) {

        UserProfileResponse response = new UserProfileResponse();

        response.setId(user.getId());
        response.setUsername(user.getUsername());
        response.setEmail(user.getEmail());

        if (user.getTags() != null) {
            response.setUserTags(
                    tagMapper.toDtos(user.getTags())
            );
        }

        return response;
    }
}