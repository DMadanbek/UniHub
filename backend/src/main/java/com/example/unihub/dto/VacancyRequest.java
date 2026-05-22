package com.example.unihub.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class VacancyRequest {
    @NotBlank
    private String title;

    @NotBlank
    private String description;

    private String contact;
    private List<Long> tagIds;
}