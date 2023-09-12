package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.BuddyDto.*;
import com.ssafy.moa.api.entity.key.KoreanKey;

public interface BuddyService {
    KoreanKey saveKoreanBuddyInfo(KoreanBuddyPostRequest koreanBuddyPostRequest);

}
