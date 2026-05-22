package com.example.unihub.controller;

import com.example.unihub.dto.EventRequest;
import com.example.unihub.dto.EventVacancyBindRequest;
import com.example.unihub.dto.EventResponse;
import com.example.unihub.entity.Event;
import com.example.unihub.entity.User;
import com.example.unihub.service.EventService;
import com.example.unihub.service.PhotoService;
import com.example.unihub.service.VacancyService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/event")
public class EventController {

    private final EventService eventService;
    private final VacancyService vacancyService;
    private final PhotoService photoService;
    private final ObjectMapper objectMapper;

    @GetMapping("/all-events")
    public List<EventResponse> getAllEvents() {
        return eventService.getAll();
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(
            value = "/create",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @Operation(summary = "Create event")
    public ResponseEntity<String> createEvent(

            @AuthenticationPrincipal User user,

            @Parameter(
                    description = "Event form data",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = EventRequest.class)
                    )
            )
            @RequestPart("formData") String formDataJson,

            @Parameter(
                    description = "Event photos",
                    content = @Content(
                            mediaType = MediaType.MULTIPART_FORM_DATA_VALUE,
                            array = @ArraySchema(
                                    schema = @Schema(
                                            type = "string",
                                            format = "binary"
                                    )
                            )
                    )
            )
            @RequestPart(value = "photos", required = false)
            List<MultipartFile> photos

    ) throws JsonProcessingException {

        EventRequest request = objectMapper.readValue(
                formDataJson,
                EventRequest.class
        );

        Event event = eventService.create(
                request,
                user.getId()
        );

        if (photos != null && !photos.isEmpty()) {
            photoService.replaceEventPhotos(event, photos);
        }

        return ResponseEntity.ok("Event created successfully");
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{eventId}")
    @Operation(summary = "Delete event")
    public ResponseEntity<String> deleteEvent(
            @PathVariable Long eventId
    ) {
        eventService.delete(eventId);
        return ResponseEntity.ok("Event deleted successfully");
    }


    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(
            value = "/update/{eventId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @Operation(summary = "Update event")
    public ResponseEntity<String> updateEvent(

            @PathVariable Long eventId,
            @Parameter(
                    description = "Event form data",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = EventRequest.class
                    )))

            @RequestPart("eventFormData") String eventFormDataJson,
            @Parameter(
                    description = "Vacancy bind data",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(
                                    implementation = EventVacancyBindRequest.class
                    )))

            @RequestPart("vacancyFormData") String vacancyFormDataJson,
            @Parameter(
                    description = "Event photos",
                    content = @Content(
                            mediaType = MediaType.MULTIPART_FORM_DATA_VALUE,
                            array = @ArraySchema(
                                    schema = @Schema(
                                            type = "string",
                                            format = "binary"
                    )))
            )
            @RequestPart(value = "photos", required = false)
            List<MultipartFile> photos

    ) throws JsonProcessingException {
        EventRequest eventRequest = objectMapper.readValue(
                eventFormDataJson,
                EventRequest.class
        );

        EventVacancyBindRequest vacancyRequest = objectMapper.readValue(
                vacancyFormDataJson,
                EventVacancyBindRequest.class
        );

        Event event = eventService.update(
                eventId,
                eventRequest
        );

        vacancyService.bindToEvent(
                eventId,
                vacancyRequest.getVacancyIds()
        );

        if (photos != null && !photos.isEmpty()) {
            photoService.replaceEventPhotos(event, photos);
        }

        return ResponseEntity.ok("Event updated successfully");
    }
}