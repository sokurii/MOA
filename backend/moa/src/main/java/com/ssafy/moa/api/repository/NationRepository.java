package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.NationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NationRepository extends JpaRepository<NationCode, Integer> {
    Optional<NationCode> findByNationCode(int nationCode);
    Optional<NationCode> findByNationName(String nationName);
}
