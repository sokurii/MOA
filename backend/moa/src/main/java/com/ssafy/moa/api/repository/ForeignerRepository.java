package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.Foreigner;
import com.ssafy.moa.api.repository.querydsl.ForeignerQueryRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ForeignerRepository extends JpaRepository<Foreigner, Long>, ForeignerQueryRepository {
    Optional<Foreigner> findByForeignerId(Long foreignerId);
}
