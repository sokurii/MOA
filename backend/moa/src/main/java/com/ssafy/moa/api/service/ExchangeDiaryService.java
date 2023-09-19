package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.ExchangeDiaryDto.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ExchangeDiaryService {
    Long saveExchangeDiary(MultipartFile multipartFile, ExchangeDiaryRequest exchangeDiaryRequest) throws IOException;
    List<ExchangeDiaryDetailResponse> findExchangeDiary(Long memberId);
    ExchangeDiaryDetailResponse findExchangeDiaryDetail(Long exchangeDiaryId);
    Long deleteExchangeDiary(Long exchangeDiaryId);
    Long updateExchangeDiary(Long exchangeId, ExchangeDiaryUpdateRequest exchangeDiaryUpdateRequest);
}
