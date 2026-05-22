package com.example.unihub.service.impl;

import com.example.unihub.dto.*;
import com.example.unihub.entity.*;
import com.example.unihub.mapper.VacancyMapper;
import com.example.unihub.repository.*;
import com.example.unihub.service.VacancyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VacancyServiceImpl implements VacancyService {

    private final VacancyRepository vacancyRepository;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;
    private final VacancyMapper vacancyMapper;

    @Override
    public Vacancy create(VacancyRequest request, Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));

        Vacancy vacancy = vacancyMapper.toEntity(request, user);

        return vacancyRepository.save(vacancy);
    }

    @Override
    public List<Vacancy> bindToEvent(Long eventId, List<Long> vacancyIds) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Event not found"
                ));

        List<Vacancy> vacancies = vacancyMapper.bindEntities(
                vacancyIds,
                event
        );

        return vacancyRepository.saveAll(vacancies);
    }

    @Override
    public void delete(Long vacancyId) {

        Vacancy vacancy = vacancyRepository.findById(vacancyId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Vacancy not found"
                ));

        vacancyRepository.delete(vacancy);
    }

    @Override
    public Vacancy update(Long vacancyId, VacancyRequest request) {

        Vacancy vacancy = vacancyRepository.findById(vacancyId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Vacancy not found"
                ));

        vacancyMapper.updateEntity(vacancy, request);

        return vacancyRepository.save(vacancy);
    }

    @Override
    public List<VacancyResponse> getAll() {

        List<Vacancy> vacancies = vacancyRepository.findAll();

        return vacancyMapper.toDtos(vacancies);
    }
}