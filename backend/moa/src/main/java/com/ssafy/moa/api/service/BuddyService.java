package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.BuddyDto.*;
import com.ssafy.moa.api.entity.Member;

public interface BuddyService {
    Long saveKoreanBuddyInfo(Member member, KoreanBuddyPostRequest koreanBuddyPostRequest);
    Long saveForeignerBuddyInfo(Long memberId, ForeignerBuddyPostRequest foreignerBuddyPostRequest);
    Long findMatchingBuddy(Member member);
    Integer deleteBuddy(Long memberId);
    Long findWithBuddyDate(Long memberId);
    Long findBuddy(Member member);
}
