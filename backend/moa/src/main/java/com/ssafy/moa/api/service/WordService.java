package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.scrap.WordDto;
import com.ssafy.moa.api.dto.scrap.WordReqDto;

import java.util.List;

public interface WordService {
    Long createWordScrap(Long memberId, WordReqDto wordReqDto);

    List<WordDto> getAllWordScrap(Long memberId);

    WordDto getWord(Long wordId);

    Long deleteWord(Long wordId);

    Long checkWord(Long memberId, String wordName);
}
