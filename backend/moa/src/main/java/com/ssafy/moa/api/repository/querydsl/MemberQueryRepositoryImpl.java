package com.ssafy.moa.api.repository.querydsl;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.moa.api.entity.Foreigner;
import com.ssafy.moa.api.entity.Korean;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.moa.api.entity.QBuddy.buddy;
import static com.ssafy.moa.api.entity.QForeigner.foreigner;
import static com.ssafy.moa.api.entity.QKorean.korean;
import static com.ssafy.moa.api.entity.QMember.member;

@Repository
@RequiredArgsConstructor
public class MemberQueryRepositoryImpl implements MemberQueryRepository{
    private final JPAQueryFactory jpaQueryFactory;

    // TODO: 중복 코드 하나로 처리
    @Override
    public List<Foreigner> findForeignerBuddyGender(long memberId) {
        return jpaQueryFactory.select(foreigner).distinct()
                .from(member)
                .innerJoin(korean).on(korean.member.memberId.eq(memberId))
                .innerJoin(foreigner)
                .on(
                        korean.koreanLikeGender.eq(3)
                                .and(foreigner.foreignerLikeGender.eq(korean.koreanLikeGender)
                                        .or(member.memberId.eq(memberId).and(foreigner.foreignerLikeGender.eq(member.memberGender))))
                                .or(foreigner.foreignerLikeGender.eq(korean.koreanLikeGender).or(korean.koreanLikeGender.eq(member.memberGender).and(foreigner.foreignerLikeGender.eq(3))))
                )
                .leftJoin(buddy).on(foreigner.foreignerId.eq(buddy.foreigner.foreignerId)).where(buddy.foreigner.foreignerId.isNull())
                .orderBy(member.createdAt.asc())
                .fetch();
    }

    @Override
    public List<Foreigner> findForeignerBuddyGenderAndNation(long memberId) {
        return jpaQueryFactory.select(foreigner).distinct()
                .from(member)
                .innerJoin(korean).on(korean.member.memberId.eq(memberId))
                .innerJoin(foreigner)
                .on(
                        korean.koreanLikeGender.eq(3)
                                .and(foreigner.foreignerLikeGender.eq(korean.koreanLikeGender)
                                        .or(member.memberId.eq(memberId).and(foreigner.foreignerLikeGender.eq(member.memberGender))))
                                .or(foreigner.foreignerLikeGender.eq(korean.koreanLikeGender).or(korean.koreanLikeGender.eq(member.memberGender).and(foreigner.foreignerLikeGender.eq(3))))
                )
                .leftJoin(buddy).on(foreigner.foreignerId.eq(buddy.foreigner.foreignerId)).where(buddy.foreigner.foreignerId.isNull().and(korean.nationCode.eq(foreigner.nationCode)))
                .orderBy(member.createdAt.asc())
                .fetch();
    }

    @Override
    public List<Korean> findKoreanBuddyGender(long memberId) {
        return jpaQueryFactory.select(korean).distinct()
                .from(member)
                .innerJoin(foreigner).on(foreigner.member.memberId.eq(memberId))
                .innerJoin(korean)
                .on(
                        foreigner.foreignerLikeGender.eq(3)
                                .and(korean.koreanLikeGender.eq(foreigner.foreignerLikeGender)
                                        .or(member.memberId.eq(memberId).and(korean.koreanLikeGender.eq(member.memberGender))))
                                .or(korean.koreanLikeGender.eq(foreigner.foreignerLikeGender).or(foreigner.foreignerLikeGender.eq(member.memberGender).and(korean.koreanLikeGender.eq(3))))
                )
                .leftJoin(buddy).on(korean.koreanId.eq(buddy.korean.koreanId)).where(buddy.korean.koreanId.isNull())
                .orderBy(member.createdAt.asc())
                .fetch();
    }

    @Override
    public List<Korean> findKoreanBuddyGenderAndNation(long memberId) {
        return jpaQueryFactory.select(korean).distinct()
                .from(member)
                .innerJoin(foreigner).on(foreigner.member.memberId.eq(memberId))
                .innerJoin(korean)
                .on(
                        foreigner.foreignerLikeGender.eq(3)
                                .and(korean.koreanLikeGender.eq(foreigner.foreignerLikeGender)
                                        .or(member.memberId.eq(memberId).and(korean.koreanLikeGender.eq(member.memberGender))))
                                .or(korean.koreanLikeGender.eq(foreigner.foreignerLikeGender).or(foreigner.foreignerLikeGender.eq(member.memberGender).and(korean.koreanLikeGender.eq(3))))
                )
                .leftJoin(buddy).on(korean.koreanId.eq(buddy.korean.koreanId)).where(buddy.korean.koreanId.isNull().and(foreigner.nationCode.eq(korean.nationCode)))
                .orderBy(member.createdAt.asc())
                .fetch();
    }

}
