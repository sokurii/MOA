package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.ExchangeDiaryDto.*;
import com.ssafy.moa.api.entity.Member;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ExchangeDiaryService {
    Long saveExchangeDiary(MultipartFile multipartFile, ExchangeDiaryRequest exchangeDiaryRequest, Long memberId) throws IOException;
    List<ExchangeDiaryDetailResponse> findExchangeDiary(Member member);
    List<ExchangeDiaryDetailResponse> findExchangeDiaryByMonth(Member member, Integer year, Integer month);
    ExchangeDiaryDetailResponse findExchangeDiaryDetail(Long exchangeDiaryId);
    Boolean isExchangeDiaryToday(Member member);
    Long deleteExchangeDiary(Long exchangeDiaryId);
    Long updateExchangeDiary(Long exchangeId, ExchangeDiaryUpdateRequest exchangeDiaryUpdateRequest);
    Member findBuddyMember(Member member);
}
