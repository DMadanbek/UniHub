package com.example.unihub.service.impl;

import com.example.unihub.dto.AiDescriptionResponse;
import com.example.unihub.service.AiService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;
@Service
@RequiredArgsConstructor
public class AiServiceImpl implements AiService {

    private final RestTemplate restTemplate;

    @Value("${gemini.api.key}")
    private String apiKey;

    private static final String GEMINI_URL =
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

    @Override
    public AiDescriptionResponse generateEventDescription(String text) {

        validateText(text);

        String prompt = buildPrompt(text);

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of(
                                "parts", List.of(
                                        Map.of(
                                                "text", prompt
                                        )
                                )
                        )
                )
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity =
                new HttpEntity<>(requestBody, headers);

        try {

            ResponseEntity<Map> response = restTemplate.exchange(
                    GEMINI_URL + "?key=" + apiKey,
                    HttpMethod.POST,
                    entity,
                    Map.class
            );

            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Gemini API request failed");
            }

            if (response.getBody() == null) {
                throw new RuntimeException("Gemini response body is empty");
            }

            List candidates =
                    (List) response.getBody().get("candidates");

            if (candidates == null || candidates.isEmpty()) {
                throw new RuntimeException("No Gemini candidates returned");
            }

            Map candidate = (Map) candidates.get(0);

            Map content = (Map) candidate.get("content");

            List parts = (List) content.get("parts");

            if (parts == null || parts.isEmpty()) {
                throw new RuntimeException("Gemini content parts missing");
            }

            Map part = (Map) parts.get(0);

            String generatedText =
                    part.get("text").toString().trim();

            return new AiDescriptionResponse(generatedText);

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to generate AI description"
            );
        }
    }

    private void validateText(String text) {

        if (text == null || text.isBlank()) {
            throw new RuntimeException("Text cannot be empty");
        }

        if (text.length() > 1000) {
            throw new RuntimeException(
                    "Text cannot exceed 1000 characters"
            );
        }
    }

    private String buildPrompt(String text) {

        return """
                Transform the provided text into an attractive,
                professional, and engaging university event description.

                Requirements:
                - Keep original meaning
                - Do not invent fake details
                - Keep under 120 words
                - Use appealing language
                - Respond ONLY with final description

                User text:
                """ + text;
    }
}