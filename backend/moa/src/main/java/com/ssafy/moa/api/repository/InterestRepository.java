package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.Interest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterestRepository extends JpaRepository<Interest, Long> {
    List<Interest> findByInterestId(Long memberId);
}
