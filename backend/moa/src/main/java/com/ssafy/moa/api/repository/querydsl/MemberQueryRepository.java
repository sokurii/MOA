package com.ssafy.moa.api.repository.querydsl;

import com.ssafy.moa.api.dto.member.MemberInfoDto;
import com.ssafy.moa.api.entity.Foreigner;
import com.ssafy.moa.api.entity.Korean;

import java.util.List;

public interface MemberQueryRepository {
    List<Foreigner> findForeignerBuddyGender(long memberId);
    List<Foreigner> findForeignerBuddyGenderAndNation(long memberId);

    List<Korean> findKoreanBuddyGender(long memberId);
    List<Korean> findKoreanBuddyGenderAndNation(long memberId);

    MemberInfoDto getMemberInfoWithLevel(Long memberId);
}
