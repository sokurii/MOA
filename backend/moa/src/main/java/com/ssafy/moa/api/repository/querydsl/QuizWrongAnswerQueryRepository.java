package com.ssafy.moa.api.repository.querydsl;

import com.ssafy.moa.api.dto.quiz.QuizQuestionDto;

import java.util.List;

public interface QuizWrongAnswerQueryRepository {

    Long getWrongQuizCount(Long memberId);

    List<QuizQuestionDto> getRandomWrongQuizzes(Long memberId, Integer wrongQuizCount);

    Long deleteWrongQuiz(Long memberId, Long quizId);
}
