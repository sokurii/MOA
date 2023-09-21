package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.BuddyDto.*;

public interface BuddyService {
    Long saveKoreanBuddyInfo(KoreanBuddyPostRequest koreanBuddyPostRequest);
    Long saveForeignerBuddyInfo(ForeignerBuddyPostRequest foreignerBuddyPostRequest);
    Long findMatchingBuddy(BuddyMatchingRequest buddyMatchingRequest);
    Integer deleteBuddy(Long memberId);
    Long findWithBuddyDate(Long memberId);
}
