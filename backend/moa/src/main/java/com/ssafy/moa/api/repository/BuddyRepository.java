package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.Buddy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuddyRepository extends JpaRepository<Buddy, Integer> {

}
