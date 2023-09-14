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
public class KoreanQueryRepositoryImpl implements KoreanQueryRepository{
    private final JPAQueryFactory jpaQueryFactory;

    // 나 - 외국인, 한국인 찾아요
//    @Override
//    public List<Korean> findKoreanBuddy(long foreignerId) {
//        return jpaQueryFactory.select(korean)
//                .from(korean)
//                .innerJoin(member).on(member.memberId.eq(foreignerId))
//                .innerJoin(foreigner)
//                .on(
//                        korean.koreanLikeGender.eq(3)
//                                .and(foreigner.foreignerLikeGender.eq(korean.koreanLikeGender)
//                                        .or(foreigner.foreignerLikeGender.eq(member.memberGender)))
//                                .or(foreigner.foreignerLikeGender.eq(korean.koreanLikeGender))
//                )
//                .leftJoin(buddy).on(korean.koreanKey.koreanId.memberId.eq(buddy.korean.koreanKey.koreanId.memberId))
//                .where(foreigner.foreignerKey.foreignerId.memberId.eq(foreignerId))
//                .orderBy(member.createdAt.asc())
//                .fetch();
//    }

//    SELECT foreigners.*
//    FROM foreigners
//    LEFT JOIN buddies ON foreigners.foreigner_id = buddies.foreigner_id
//    WHERE buddies.foreigner_id IS NULL;

}
