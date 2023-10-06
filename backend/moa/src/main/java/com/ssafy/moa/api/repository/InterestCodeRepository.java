package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.InterestCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InterestCodeRepository extends JpaRepository<InterestCode, Integer> {
    Optional<InterestCode> findByInterestCode(int interestCode);
}
