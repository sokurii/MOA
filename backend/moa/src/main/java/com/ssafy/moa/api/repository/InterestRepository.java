package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.Interest;
import com.ssafy.moa.api.entity.key.InterestKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InterestRepository extends JpaRepository<Interest, InterestKey> {
}
