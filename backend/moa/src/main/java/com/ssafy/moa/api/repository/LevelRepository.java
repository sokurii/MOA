package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.Level;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LevelRepository extends JpaRepository<Level, Long> {

    Optional<Level> findByLevelId(Long levelId);

}
