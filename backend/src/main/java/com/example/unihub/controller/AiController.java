package com.example.unihub.controller;

import com.example.unihub.dto.AiDescriptionRequest;
import com.example.unihub.dto.AiDescriptionResponse;
import com.example.unihub.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final AiService aiService;

    @PostMapping("/generate-description")
    public AiDescriptionResponse generateDescription(
            @RequestBody AiDescriptionRequest request
    ) {

        return aiService.generateEventDescription(request.getText());
    }
}