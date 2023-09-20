package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.entity.OpenChat;
import com.ssafy.moa.api.entity.OpenChatMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OpenChatMemberRepository extends JpaRepository<OpenChatMember, Long> {
    Integer countByOpenChat(OpenChat openChat);
    void deleteByMember(Member member);
}
