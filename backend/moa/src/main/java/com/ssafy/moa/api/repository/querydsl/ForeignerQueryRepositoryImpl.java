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
public class ForeignerQueryRepositoryImpl implements ForeignerQueryRepository{
    private final JPAQueryFactory jpaQueryFactory;

    // 나 - 한국인, 외국인 찾아요
//    @Override
//    public List<Foreigner> findForeignerBuddy(long koreanId) {
//        return jpaQueryFactory.select(foreigner)
//                .from(foreigner)
//                .innerJoin(member).on(member.memberId.eq(koreanId))
//                .innerJoin(korean)
//                .on(
//                        korean.koreanLikeGender.eq(3)
//                                .and(foreigner.foreignerLikeGender.eq(korean.koreanLikeGender)
//                                        .or(foreigner.foreignerLikeGender.eq(member.memberGender)))
//                                .or(foreigner.foreignerLikeGender.eq(korean.koreanLikeGender))
//                )
//                .leftJoin(buddy).on(foreigner.foreignerKey.foreignerId.memberId.eq(buddy.foreigner.foreignerKey.foreignerId.memberId))
//                .where(korean.koreanKey.koreanId.memberId.eq(koreanId))
//                .orderBy(member.createdAt.asc())
//                .fetch();
//    }

}
