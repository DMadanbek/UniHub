package com.example.unihub.service;

import com.example.unihub.dto.VacancyRequest;
import com.example.unihub.dto.VacancyResponse;
import com.example.unihub.entity.Vacancy;

import java.util.List;

public interface VacancyService {

    Vacancy create(VacancyRequest request, Long userId);

    List<Vacancy> bindToEvent(Long eventId, List<Long> vacancyIds);

    void delete(Long vacancyId);

    Vacancy update(Long vacancyId, VacancyRequest request);

    List<VacancyResponse> getAll();
}