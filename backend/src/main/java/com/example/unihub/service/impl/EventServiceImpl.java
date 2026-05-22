package com.example.unihub.service.impl;

import com.example.unihub.dto.*;
import com.example.unihub.entity.*;
import com.example.unihub.mapper.EventMapper;
import com.example.unihub.repository.*;
import com.example.unihub.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final EventMapper eventMapper;

    @Override
    public Event create(EventRequest request, Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "User not found"
                ));
        Event event = eventMapper.toEntity(request, user);
        return eventRepository.save(event);
    }

    @Override
    public Event update(Long eventId, EventRequest request) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Event not found"
                ));
        eventMapper.updateEntity(event, request);
        return eventRepository.save(event);
    }

    @Override
    public void delete(Long eventId) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Event not found"
                ));
        eventRepository.delete(event);
    }

    @Override
    public List<EventResponse> getAll() {
        List<Event> events = eventRepository.findAll(
                Sort.by(Sort.Direction.DESC, "createdAt")
        );
        return eventMapper.toDtos(events);
    }
}