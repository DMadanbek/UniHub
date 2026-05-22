package com.example.unihub.mapper.impl;

import com.example.unihub.dto.VacancyRequest;
import com.example.unihub.dto.VacancyResponse;
import com.example.unihub.entity.Event;
import com.example.unihub.entity.Vacancy;
import com.example.unihub.entity.User;
import com.example.unihub.mapper.TagMapper;
import com.example.unihub.mapper.VacancyMapper;
import com.example.unihub.repository.VacancyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class VacancyMapperImpl implements VacancyMapper {

    private final TagMapper tagMapper;
    private final VacancyRepository vacancyRepository;

    @Override
    public Vacancy toEntity(VacancyRequest request, User owner) {

        Vacancy vacancy = new Vacancy();

        vacancy.setTitle(request.getTitle());
        vacancy.setDescription(request.getDescription());
        vacancy.setContact(request.getContact());
        vacancy.setOwner(owner);

        if (request.getTagIds() != null) {
            vacancy.setTags(
                    tagMapper.toEntities(request.getTagIds())
            );
        }

        return vacancy;
    }

    @Override
    public List<Vacancy> bindEntities(List<Long> vacancyIds, Event event) {

        if (vacancyIds == null || vacancyIds.isEmpty()) {
            return Collections.emptyList();
        }

        List<Vacancy> vacancies = vacancyRepository.findAllById(vacancyIds);
        event.getVacancies()
                .forEach(v -> v.setEvent(null));
        vacancies.forEach(vacancy -> vacancy.setEvent(event));

        return vacancies;
    }

    @Override
    public Vacancy updateEntity(Vacancy vacancy, VacancyRequest request) {

        vacancy.setTitle(request.getTitle());
        vacancy.setDescription(request.getDescription());
        vacancy.setContact(request.getContact());

        if (request.getTagIds() != null) {
            vacancy.setTags(
                    tagMapper.toEntities(request.getTagIds())
            );
        }

        return vacancy;
    }

    @Override
    public VacancyResponse toDto(Vacancy vacancy) {

        VacancyResponse response = new VacancyResponse();

        response.setId(vacancy.getId());
        response.setTitle(vacancy.getTitle());
        response.setDescription(vacancy.getDescription());
        response.setContact(vacancy.getContact());

        if (vacancy.getTags() != null) {
            response.setTags(
                    tagMapper.toDtos(vacancy.getTags())
            );
        }

        return response;
    }

    @Override
    public List<VacancyResponse> toDtos(List<Vacancy> vacancies) {

        if (vacancies == null || vacancies.isEmpty()) {
            return Collections.emptyList();
        }

        return vacancies.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}