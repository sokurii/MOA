package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.quiz.QuizQuestionDto;
import com.ssafy.moa.api.entity.DailyKoreanQuiz;
import com.ssafy.moa.api.repository.querydsl.QuizQueryRepository;
import com.ssafy.moa.api.service.QuizService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizQueryRepository quizQueryRepository;

    // 단어 퀴즈 출제
    @Override
    public List<QuizQuestionDto> questionWordQuiz() {
        // QuizRepository에서 랜덤으로 15개의 Quiz를 가져온다.
        List<QuizQuestionDto> quizQuestionDtoList = quizQueryRepository.getRandomQuizzes();
        // 퀴즈에 따라 보기를 생성한다.
        // 퀴즈 유형 1,2는 답을 포함한 보기가 4개

        // 단어 보기 생성
        for(int i = 0; i<quizQuestionDtoList.size(); i++) {
            QuizQuestionDto quizQuestionDto = quizQuestionDtoList.get(i);
            if(quizQuestionDto.getQuizCategoryId() == 1 || quizQuestionDto.getQuizCategoryId() == 2) {
                log.info(quizQuestionDto.toString());

                // 퀴즈 보기 가져오기
                String quizAnswer = quizQuestionDto.getQuizAnswer();
               List<String> quizAnswerList = quizQueryRepository.getWordQuizAnswerList(quizAnswer);
               quizAnswerList.add(quizAnswer);
                Collections.shuffle(quizAnswerList);
                quizQuestionDto.setQuizAnswerList(quizAnswerList);

                quizQuestionDtoList.set(i, quizQuestionDto);
            }
        }

        return quizQuestionDtoList;
    }
}
