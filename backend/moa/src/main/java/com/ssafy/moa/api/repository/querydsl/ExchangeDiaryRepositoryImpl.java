package com.ssafy.moa.api.repository.querydsl;

import com.querydsl.core.types.dsl.DateTemplate;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.moa.api.entity.ExchangeDiary;
import com.ssafy.moa.api.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

import static com.ssafy.moa.api.entity.QExchangeDiary.exchangeDiary;

@Slf4j
@RequiredArgsConstructor
public class ExchangeDiaryRepositoryImpl implements ExchangeDiaryRepositoryCustom {
    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<ExchangeDiary> findMonth(Member member, Member buddyMember, Integer year, Integer month) {
        return jpaQueryFactory.select(exchangeDiary)
                .from(exchangeDiary)
                .where(exchangeDiary.exchangeDiaryDate.year().eq(year).and(exchangeDiary.exchangeDiaryDate.month().eq(month))
                        .and(exchangeDiary.member.eq(member).or(exchangeDiary.member.eq(buddyMember))))
                .fetch();
    }

    @Override
    public boolean findToday(Member member) {
        DateTemplate<LocalDate> date = Expressions.dateTemplate(LocalDate.class, "DATE_FORMAT({0}, '%Y-%m-%d')", exchangeDiary.exchangeDiaryDate);
        LocalDate now = LocalDate.now();
        List<ExchangeDiary> memberWrite = jpaQueryFactory.select(exchangeDiary)
                .from(exchangeDiary)
                .where(date.eq(now).and(exchangeDiary.member.eq(member)))
                .fetch();
        for(ExchangeDiary exchangeDiary1 : memberWrite) {
            log.info(String.valueOf("ex : " + exchangeDiary1.getMember()) + exchangeDiary1.getExchangeDiaryId());
        }
        if(memberWrite.isEmpty()) return true; // 내가 안 적었다면
        return false;
    }

    @Override
    public List<ExchangeDiary> findDay(Member member, Member buddyMember, String day) {
        DateTemplate<LocalDate> date = Expressions.dateTemplate(LocalDate.class, "DATE_FORMAT({0}, '%Y-%m-%d')", exchangeDiary.exchangeDiaryDate);
        List<ExchangeDiary> memberWrite = jpaQueryFactory.select(exchangeDiary)
                .from(exchangeDiary)
                .where(date.eq(LocalDate.parse(day))
                        .and(exchangeDiary.member.eq(member).or(exchangeDiary.member.eq(buddyMember))))
                .fetch();
        return memberWrite;
    }
}
