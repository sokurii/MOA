package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.Korean;
import com.ssafy.moa.api.repository.querydsl.KoreanQueryRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KoreanRepository extends JpaRepository<Korean, Long>, KoreanQueryRepository {

}
