package com.example.unihub.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class VacancyResponse {
    private Long id;
    private String title;
    private String description;
    private String contact;
    private List<TagResponse> tags;
}
