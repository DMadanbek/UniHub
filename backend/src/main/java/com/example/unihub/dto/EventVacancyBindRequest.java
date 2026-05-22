package com.example.unihub.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class EventVacancyBindRequest {
    private List<Long> vacancyIds;
}
