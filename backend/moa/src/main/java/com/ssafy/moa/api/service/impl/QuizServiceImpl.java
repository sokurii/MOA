package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.quiz.QuizQuestionDto;
import com.ssafy.moa.api.entity.DailyKoreanQuiz;
import com.ssafy.moa.api.repository.querydsl.QuizQueryRepository;
import com.ssafy.moa.api.service.QuizService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final QuizQueryRepository quizQueryRepository;

    @Override
    public List<QuizQuestionDto> submitQuiz() {
        // QuizRepository에서 랜덤으로 15개의 Quiz를 가져온다.
        List<QuizQuestionDto> quizQuestionDtoList = quizQueryRepository.getRandomQuizzes();

        log.info(quizQuestionDtoList.toString());

        return null;
    }
}
