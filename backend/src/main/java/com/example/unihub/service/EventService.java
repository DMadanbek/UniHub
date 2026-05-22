package com.example.unihub.service;

import com.example.unihub.dto.EventRequest;
import com.example.unihub.dto.EventResponse;
import com.example.unihub.entity.Event;

import java.util.List;

public interface EventService {

    Event create(EventRequest request, Long userId);

    Event update(Long eventId, EventRequest request);

    void delete(Long eventId);

    List<EventResponse> getAll();
}