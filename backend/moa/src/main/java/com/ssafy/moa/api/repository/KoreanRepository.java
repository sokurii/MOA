package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.Korean;
import com.ssafy.moa.api.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KoreanRepository extends JpaRepository<Korean, Long> {
    Optional<Korean> findByMember(Member member);
}
