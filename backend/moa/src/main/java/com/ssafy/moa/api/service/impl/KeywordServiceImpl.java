package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.KeywordDto;
import com.ssafy.moa.api.dto.KeywordReqDto;
import com.ssafy.moa.api.entity.Keyword;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.repository.KeywordRepository;
import com.ssafy.moa.api.repository.MemberRepository;
import com.ssafy.moa.api.service.KeywordService;
import com.ssafy.moa.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class KeywordServiceImpl implements KeywordService {
    private final KeywordRepository keywordRepository;
    private final MemberRepository memberRepository;

    @Override
    public Long createKeyword(Long memberId, List<KeywordReqDto> keywordList) {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new NotFoundException("Not Found Member"));

        for (KeywordReqDto kewordReqDto: keywordList){
            Keyword keyword = Keyword.builder()
                    .keywordName(kewordReqDto.getKeywordName())
                    .member(member)
                    .build();
            keywordRepository.save(keyword);
        }
        return member.getMemberId();
    }

    @Override
    public List<KeywordDto> getAllKeyword(Long memberId) {
        List<Keyword> keywordList = keywordRepository.findByMember_MemberId(memberId);
        List<KeywordDto> result = new ArrayList<>();
        for (Keyword keyword : keywordList){
            result.add(KeywordDto.from(keyword));
        }
        return result;
    }

    @Override
    @Transactional
    public Long deleteKeyword(Long keywordId) {
        return keywordRepository.deleteByKeywordId(keywordId);
    }

    @Override
    public List<KeywordReqDto> getBestKeyword() {
        return keywordRepository.getBestKeyword();
    }
}
