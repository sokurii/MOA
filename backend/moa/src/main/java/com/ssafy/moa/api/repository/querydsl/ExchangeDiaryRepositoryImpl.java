package com.ssafy.moa.api.repository.querydsl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.moa.api.entity.ExchangeDiary;
import com.ssafy.moa.api.entity.Member;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.ssafy.moa.api.entity.QExchangeDiary.exchangeDiary;

@RequiredArgsConstructor
public class ExchangeDiaryRepositoryImpl implements ExchangeDiaryRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<ExchangeDiary> findMonth(Member member, Member buddyMember, Integer month) {
        return jpaQueryFactory.select(exchangeDiary)
                .from(exchangeDiary)
                .where(exchangeDiary.exchangeDiaryDate.month().eq(month)
                        .and(exchangeDiary.member.eq(member).or(exchangeDiary.member.eq(buddyMember))))
                .fetch();
    }
}
