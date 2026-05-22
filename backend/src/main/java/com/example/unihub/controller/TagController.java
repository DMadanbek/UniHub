package com.example.unihub.controller;

import com.example.unihub.dto.TagResponse;
import com.example.unihub.service.TagService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tag")
public class TagController {

    private final TagService tagService;

    @GetMapping("/user-skill")
    public List<TagResponse> getUserSkillTags() {
        return tagService.getUserSkillTags();
    }

    @GetMapping("/event")
    public List<TagResponse> getEventTags() {
        return tagService.getEventTags();
    }

    @GetMapping("/vacancy")
    public List<TagResponse> getVacancyTags() {
        return tagService.getVacancyTags();
    }
}