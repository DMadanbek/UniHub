package com.example.unihub.service.impl;

import com.example.unihub.entity.*;
import com.example.unihub.repository.*;
import com.example.unihub.service.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PhotoServiceImpl implements PhotoService {

    private final PhotoRepository photoRepo;
    private final EventRepository eventRepo;

    private void validateFile(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        if (file.getSize() > 5 * 1024 * 1024) {
            throw new IllegalArgumentException("Max file size is 5MB");
        }

        String type = file.getContentType();

        if (!List.of(
                "image/jpeg",
                "image/png",
                "image/webp"
        ).contains(type)) {

            throw new IllegalArgumentException(
                    "Only JPG, PNG, and WEBP files are allowed"
            );
        }
    }

    private Photo savePhotoToDatabase(MultipartFile file) {

        validateFile(file);

        try {

            Photo photo = new Photo();

            photo.setFileName(
                    UUID.randomUUID() + "_" + file.getOriginalFilename()
            );

            photo.setMimeType(file.getContentType());

            photo.setUploadTime(LocalDateTime.now());

            photo.setData(file.getBytes());

            return photo;

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to save photo to database",
                    e
            );
        }
    }

    private void deletePhoto(Photo photo) {

        if (photo != null) {
            photoRepo.delete(photo);
        }
    }

    @Override
    public void replaceEventPhotos(
            Event event,
            List<MultipartFile> files
    ) {

        List<Photo> existingPhotos = event.getPhotos();

        if (existingPhotos != null && !existingPhotos.isEmpty()) {

            for (Photo photo : new ArrayList<>(existingPhotos)) {
                deletePhoto(photo);
            }

            existingPhotos.clear();
        }

        if (files == null || files.isEmpty()) {
            eventRepo.save(event);
            return;
        }

        for (MultipartFile file : files) {

            Photo photo = savePhotoToDatabase(file);

            photo.setEvent(event);

            photoRepo.save(photo);

            existingPhotos.add(photo);
        }

        eventRepo.save(event);
    }
}