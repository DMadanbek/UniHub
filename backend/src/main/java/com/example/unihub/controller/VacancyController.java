package com.example.unihub.controller;

import com.example.unihub.dto.VacancyRequest;
import com.example.unihub.dto.VacancyResponse;
import com.example.unihub.entity.*;
import com.example.unihub.service.VacancyService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
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

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/vacancy")
public class VacancyController {

    private final VacancyService vacancyService;
    private final ObjectMapper objectMapper;

    @GetMapping("/all-vacancies")
    @Operation(summary = "Get all vacancies")
    public List<VacancyResponse> getAllVacancies() {
        return vacancyService.getAll();
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping(
            value = "/create",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @Operation(summary = "Create vacancy")
    public ResponseEntity<String> createVacancy(

            @AuthenticationPrincipal User user,
            @Parameter(
                    description = "Vacancy form data",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = VacancyRequest.class)
                    )
            )
            @RequestPart("formData") String formDataJson

    ) throws JsonProcessingException {

        VacancyRequest request = objectMapper.readValue(
                formDataJson,
                VacancyRequest.class
        );

        vacancyService.create(
                request,
                user.getId()
        );

        return ResponseEntity.ok("Vacancy created successfully");
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/delete/{vacancyId}")
    @Operation(summary = "Delete vacancy")
    public ResponseEntity<String> deleteVacancy(
            @PathVariable Long vacancyId
    ) {

        vacancyService.delete(vacancyId);

        return ResponseEntity.ok("Vacancy deleted successfully");
    }

    @SecurityRequirement(name = "bearerAuth")
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping(
            value = "/update/{vacancyId}",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    @Operation(summary = "Update vacancy")
    public ResponseEntity<String> updateVacancy(

            @PathVariable Long vacancyId,

            @Parameter(
                    description = "Vacancy form data",
                    content = @Content(
                            mediaType = MediaType.APPLICATION_JSON_VALUE,
                            schema = @Schema(implementation = VacancyRequest.class)
                    )
            )
            @RequestPart("formData") String formDataJson

    ) throws JsonProcessingException {

        VacancyRequest request = objectMapper.readValue(
                formDataJson,
                VacancyRequest.class
        );

        vacancyService.update(
                vacancyId,
                request
        );
        return ResponseEntity.ok("Vacancy updated successfully");
    }
}