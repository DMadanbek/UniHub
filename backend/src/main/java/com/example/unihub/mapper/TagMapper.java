package com.example.unihub.mapper;

import com.example.unihub.dto.TagResponse;
import com.example.unihub.entity.Tag;

import java.util.List;

public interface TagMapper {

    Tag toEntity(Long tagId);

    List<Tag> toEntities(List<Long> tagIds);

    TagResponse toDto(Tag tag);

    List<TagResponse> toDtos(List<Tag> tags);
}