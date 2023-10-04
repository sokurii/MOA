package com.ssafy.moa.api.repository.querydsl;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.moa.api.dto.member.MemberInfoDto;
import com.ssafy.moa.api.entity.Foreigner;
import com.ssafy.moa.api.entity.Korean;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.ssafy.moa.api.entity.QBuddy.buddy;
import static com.ssafy.moa.api.entity.QForeigner.foreigner;
import static com.ssafy.moa.api.entity.QKorean.korean;
import static com.ssafy.moa.api.entity.QMember.member;
import static com.ssafy.moa.api.entity.QLevel.level;
import static com.ssafy.moa.api.entity.QNationCode.nationCode1;

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
                .fetch();
    }

    // Level 정보와 함께 외국인 Member 정보를 조회한다.
    @Override
    public MemberInfoDto getForeignerMemberInfoWithLevel(Long memberId) {
        Tuple tuple = jpaQueryFactory.select(member.memberId, member.memberIsForeigner, member.memberName, foreigner.foreignerKoreaName, member.memberImgAddress,
                nationCode1.nationName, level.levelId, level.levelName, level.levelGrade, member.memberExp, level.requiredExp)
                .from(member)
                .innerJoin(level).on(member.memberLevel.eq(level))
                .leftJoin(foreigner).on(member.memberId.eq(foreigner.member.memberId))
                .leftJoin(nationCode1).on(nationCode1.eq(foreigner.nationCode))
                .where(member.memberId.eq(memberId))
                .fetchOne();

        return MemberInfoDto.builder()
                .memberId(tuple.get(member.memberId))
                .memberIsForeigner(tuple.get(member.memberIsForeigner))
                .memberName(tuple.get(member.memberName))
                .memberKoreaName(tuple.get(foreigner.foreignerKoreaName))
                .memberImgAddress(tuple.get(member.memberImgAddress))
                .memberNationName(tuple.get(nationCode1.nationName))
                .memberLevelId(tuple.get(level.levelId))
                .memberLevelName(tuple.get(level.levelName))
                .memberLevelGrade(tuple.get(level.levelGrade))
                .memberExp(tuple.get(member.memberExp))
                .memberRequiredExp(tuple.get(level.requiredExp))
                .build();
    }

    // Level 정보와 함께 한국인 Member 정보를 조회한다.
    @Override
    public MemberInfoDto getKoreanMemberInfoWithLevel(Long memberId) {
        Tuple tuple = jpaQueryFactory.select(member.memberId, member.memberName, member.memberImgAddress, nationCode1.nationName)
                .from(member)
                .innerJoin(korean).on(member.memberId.eq(korean.member.memberId))
                .leftJoin(nationCode1).on(korean.nationCode.eq(nationCode1))
                .where(member.memberId.eq(memberId))
                .fetchOne();

        return MemberInfoDto.builder()
                .memberId(tuple.get(member.memberId))
                .memberName(tuple.get(member.memberName))
                .memberImgAddress(tuple.get(member.memberImgAddress))
                .memberNationName(tuple.get(nationCode1.nationName))
                .build();
    }

}
