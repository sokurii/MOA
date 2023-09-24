package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.OpenChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OpenChatMessageRepository extends JpaRepository<OpenChatMessage, Long> {
    List<OpenChatMessage> findByRoomIdOrderByTimeDesc(Long roomId);
}
