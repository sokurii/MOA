package com.ssafy.moa.api.repository.querydsl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import static com.ssafy.moa.api.entity.QInterest.interest;

@Repository
@RequiredArgsConstructor
public class InterestQueryRepositoryImpl implements InterestQueryRepository{
    private final JPAQueryFactory jpaQueryFactory;
    @Override
    public Integer countByInterest(Long koreanId, Long foreignId) {
        return Math.toIntExact(jpaQueryFactory.select(interest.interestCode.count())
                .from(interest)
                .where(interest.member.memberId.in(1, 2))
                .groupBy(interest.interestCode)
                .having(interest.member.memberId.count().gt(1)).fetchOne());
    }
}
