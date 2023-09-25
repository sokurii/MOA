package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.KeywordDto;
import com.ssafy.moa.api.dto.KeywordReqDto;

import java.util.List;

public interface KeywordService {
    Long createKeyword(Long memberId, List<KeywordReqDto> keywordList);

    List<KeywordDto> getAllKeyword(Long memberId);

    Long deleteKeyword(Long keywordId);

    List<KeywordReqDto> getBestKeyword();
}
