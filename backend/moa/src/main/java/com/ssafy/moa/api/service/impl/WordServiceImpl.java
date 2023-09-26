package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.scrap.WordDto;
import com.ssafy.moa.api.dto.scrap.WordReqDto;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.entity.Word;
import com.ssafy.moa.api.repository.MemberRepository;
import com.ssafy.moa.api.repository.WordRepository;
import com.ssafy.moa.api.service.WordService;
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
public class WordServiceImpl implements WordService {

    private final MemberRepository memberRepository;
    private final WordRepository wordRepository;

    @Override
    public Long createWordScrap(Long memberId, WordReqDto wordReqDto) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() -> new NotFoundException("Not Found Member"));

        Word word = Word.builder()
                .wordName(wordReqDto.getWordName())
                .wordMean(wordReqDto.getWordMean())
                .member(member)
                .build();

        return wordRepository.save(word).getWordId();
    }

    @Override
    public List<WordDto> getAllWordScrap(Long memberId) {
        List<Word> wordList = wordRepository.findByMember_MemberIdOrderByCreatedAtDesc(memberId);

        List<WordDto> result = new ArrayList<>();
        wordList.forEach(e -> {
            result.add(WordDto.from(e));
        });
        return result;
    }

    @Override
    public WordDto getWord(Long wordId) {
        Word word = wordRepository.findById(wordId).orElseThrow(() -> new NotFoundException("Not Found Word Detail"));
        return WordDto.from(word);
    }

    @Override
    @Transactional
    public Long deleteWord(Long wordId) {
        return wordRepository.deleteByWordId(wordId);
    }

    @Override
    public Long checkWord(Long memberId, String wordName) {
        List<Word> wordList = wordRepository.findByMember_MemberIdAndWordName(memberId, wordName);

        Long result = 0L;
        if(wordList.size()!=0){
            result = 1L;
        }
        return result;
    }
}
