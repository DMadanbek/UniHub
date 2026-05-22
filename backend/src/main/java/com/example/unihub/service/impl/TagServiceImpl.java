package com.example.unihub.service.impl;

import com.example.unihub.dto.TagResponse;
import com.example.unihub.entity.Tag;
import com.example.unihub.entity.enums.TagType;
import com.example.unihub.mapper.TagMapper;
import com.example.unihub.repository.TagRepository;
import com.example.unihub.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;
    private final TagMapper tagMapper;

    @Override
    public List<TagResponse> getUserSkillTags() {

        List<Tag> tags = tagRepository.findByType(
                TagType.USER_SKILL
        );

        return tagMapper.toDtos(tags);
    }

    @Override
    public List<TagResponse> getEventTags() {

        List<Tag> tags = tagRepository.findByType(
                TagType.EVENT
        );

        return tagMapper.toDtos(tags);
    }

    @Override
    public List<TagResponse> getVacancyTags() {

        List<Tag> tags = tagRepository.findByType(
                TagType.VACANCY
        );

        return tagMapper.toDtos(tags);
    }
}