package com.example.unihub.service;

import com.example.unihub.dto.TagResponse;

import java.util.List;

public interface TagService {

    List<TagResponse> getUserSkillTags();

    List<TagResponse> getEventTags();

    List<TagResponse> getVacancyTags();
}