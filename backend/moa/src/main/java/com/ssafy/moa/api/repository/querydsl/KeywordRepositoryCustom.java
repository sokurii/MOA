package com.ssafy.moa.api.repository.querydsl;

import com.ssafy.moa.api.dto.KeywordDto;
import com.ssafy.moa.api.dto.KeywordReqDto;

import java.util.List;

public interface KeywordRepositoryCustom {
    List<KeywordReqDto> getBestKeyword();
}
