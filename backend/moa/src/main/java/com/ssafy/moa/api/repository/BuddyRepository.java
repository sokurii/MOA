package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.Buddy;
import com.ssafy.moa.api.entity.Foreigner;
import com.ssafy.moa.api.entity.Korean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BuddyRepository extends JpaRepository<Buddy, Long> {
    Integer deleteByKorean(Korean korean);
    Integer deleteByForeigner(Foreigner foreigner);
    Optional<Buddy> findByKorean(Korean korean);
    Optional<Buddy> findByForeigner(Foreigner foreigner);

}
