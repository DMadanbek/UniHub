package com.example.unihub.repository;

import com.example.unihub.entity.Tag;
import com.example.unihub.entity.enums.TagType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    List<Tag> findByType(TagType type);
}
