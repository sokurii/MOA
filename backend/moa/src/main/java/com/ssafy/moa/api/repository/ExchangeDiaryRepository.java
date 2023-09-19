package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.ExchangeDiary;
import com.ssafy.moa.api.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExchangeDiaryRepository extends JpaRepository<ExchangeDiary, Long> {
    ExchangeDiary findByExchangeDiaryId(Long exchangeDiaryId);
    List<ExchangeDiary> findByMemberOrMember(Member member, Member buddyMember);
    Long deleteByExchangeDiaryId(Long exchangeDiaryId);
}
