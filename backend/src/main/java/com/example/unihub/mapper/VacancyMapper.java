package com.example.unihub.mapper;

import com.example.unihub.dto.VacancyRequest;
import com.example.unihub.dto.VacancyResponse;
import com.example.unihub.entity.Event;
import com.example.unihub.entity.User;
import com.example.unihub.entity.Vacancy;

import java.util.List;

public interface VacancyMapper {

    Vacancy toEntity(VacancyRequest request, User owner);

    List<Vacancy> bindEntities(List<Long> vacancyIds, Event event);

    Vacancy updateEntity(Vacancy vacancy, VacancyRequest request);

    VacancyResponse toDto(Vacancy vacancy);

    List<VacancyResponse> toDtos(List<Vacancy> vacancies);
}