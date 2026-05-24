package com.example.unihub.service;

import com.example.unihub.dto.AiDescriptionResponse;

public interface AiService {

    AiDescriptionResponse generateEventDescription(String text);
}