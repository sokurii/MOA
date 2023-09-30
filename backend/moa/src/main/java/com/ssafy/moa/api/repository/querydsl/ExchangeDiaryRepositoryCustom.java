package com.ssafy.moa.api.repository.querydsl;

import com.ssafy.moa.api.entity.ExchangeDiary;
import com.ssafy.moa.api.entity.Member;

import java.util.List;

public interface ExchangeDiaryRepositoryCustom {
    List<ExchangeDiary> findMonth(Member member, Member buddyMember, Integer year, Integer month);
    boolean findToday(Member member);
}
