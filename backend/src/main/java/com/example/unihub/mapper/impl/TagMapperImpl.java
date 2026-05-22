package com.example.unihub.mapper.impl;
import com.example.unihub.dto.TagResponse;
import com.example.unihub.entity.Tag;
import com.example.unihub.mapper.TagMapper;
import com.example.unihub.repository.TagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TagMapperImpl implements TagMapper {

    private final TagRepository tagRepository;

    @Override
    public Tag toEntity(Long tagId) {
        return tagRepository.findById(tagId)
                .orElseThrow(() -> new RuntimeException("Tag not found with id: " + tagId));
    }

    @Override
    public List<Tag> toEntities(List<Long> tagIds) {

        if (tagIds == null || tagIds.isEmpty()) {
            return Collections.emptyList();
        }

        return tagIds.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    @Override
    public TagResponse toDto(Tag tag) {

        TagResponse response = new TagResponse();

        response.setId(tag.getId());
        response.setName(tag.getName());

        return response;
    }

    @Override
    public List<TagResponse> toDtos(List<Tag> tags) {

        if (tags == null || tags.isEmpty()) {
            return Collections.emptyList();
        }

        return tags.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}