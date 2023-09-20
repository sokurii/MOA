package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.OpenChat;
import com.ssafy.moa.api.repository.querydsl.OpenChatQueryRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OpenChatRepository extends JpaRepository<OpenChat, Long>, OpenChatQueryRepository {
    Optional<OpenChat> findByOpenChatId(Long openChatId);
    void deleteByOpenChatId(Long openChatId);
}
