package com.example.unihub.mapper;

import com.example.unihub.dto.EventRequest;
import com.example.unihub.dto.EventResponse;
import com.example.unihub.entity.Event;
import com.example.unihub.entity.Tag;
import com.example.unihub.entity.User;

import java.util.List;

public interface EventMapper {

    Event toEntity(EventRequest request, User owner);

    Event updateEntity(Event event, EventRequest request);

    EventResponse toDto(Event event);

    List<EventResponse> toDtos(List<Event> events);
}