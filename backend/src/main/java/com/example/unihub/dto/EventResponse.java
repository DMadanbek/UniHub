package com.example.unihub.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
public class EventResponse {
    private Long id;
    private String title;
    private String description;
    private LocalDate createdAt ;
    private LocalDate startDate;
    private List<String> photoUrls;
    private List<VacancyResponse> vacancies;
    private List<TagResponse> tags;
}
