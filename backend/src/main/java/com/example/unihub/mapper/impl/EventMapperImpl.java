package com.example.unihub.mapper.impl;

import com.example.unihub.config.UrlBuilder;
import com.example.unihub.dto.EventRequest;
import com.example.unihub.entity.Event;
import com.example.unihub.entity.Tag;
import com.example.unihub.entity.User;
import com.example.unihub.mapper.EventMapper;

import java.time.LocalDate;

import com.example.unihub.dto.EventRequest;
import com.example.unihub.dto.EventResponse;
import com.example.unihub.entity.Event;
import com.example.unihub.entity.Photo;
import com.example.unihub.entity.User;
import com.example.unihub.mapper.TagMapper;
import com.example.unihub.mapper.VacancyMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class EventMapperImpl implements EventMapper {

    private final TagMapper tagMapper;
    private final VacancyMapper vacancyMapper;
    private final UrlBuilder urlBuilder;

    @Override
    public Event toEntity(EventRequest request, User owner) {

        Event event = new Event();

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setStartDate(request.getStartDate());
        event.setOwner(owner);

        if (request.getTagIds() != null) {
            event.setTags(tagMapper.toEntities(request.getTagIds()));
        }

        return event;
    }

    @Override
    public Event updateEntity(Event event, EventRequest request) {

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setStartDate(request.getStartDate());

        if (request.getTagIds() != null) {
            event.setTags(tagMapper.toEntities(request.getTagIds()));
        }

        return event;
    }

    @Override
    public EventResponse toDto(Event event) {

        EventResponse response = new EventResponse();

        response.setId(event.getId());
        response.setTitle(event.getTitle());
        response.setDescription(event.getDescription());
        response.setCreatedAt(event.getCreatedAt());

        List<String> photoUrls = event.getPhotos() == null
                ? Collections.emptyList()
                : event.getPhotos().stream()
                .map(Photo::getId)
                .map(urlBuilder::buildFullPhotoUrl)
                .collect(Collectors.toList());

        response.setPhotoUrls(photoUrls);

        if (event.getTags() != null) {
            response.setTags(tagMapper.toDtos(event.getTags()));
        }

        if (event.getVacancies() != null) {
            response.setVacancies(
                    vacancyMapper.toDtos(event.getVacancies())
            );
        }

        return response;
    }

    @Override
    public List<EventResponse> toDtos(List<Event> events) {

        if (events == null || events.isEmpty()) {
            return Collections.emptyList();
        }

        return events.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}