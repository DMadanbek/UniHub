package com.example.unihub.service;

import com.example.unihub.entity.Event;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PhotoService {
    void replaceEventPhotos(Event event, List<MultipartFile> files);
}