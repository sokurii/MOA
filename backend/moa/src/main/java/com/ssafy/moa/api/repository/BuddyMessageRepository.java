package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.BuddyMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BuddyMessageRepository extends JpaRepository<BuddyMessage, Long> {
    List<BuddyMessage> findByRoomIdOrderByTimeDesc(Long roomId);
}
