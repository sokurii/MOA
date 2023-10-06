package com.ssafy.moa.api.repository.querydsl;

import com.ssafy.moa.api.dto.quiz.QuizQuestionDto;
import java.util.List;

public interface QuizQueryRepository {

    List<QuizQuestionDto> getRandomQuizzes();

    List<String> getWordQuizAnswerList(String quizAnswer);

    List<QuizQuestionDto> getRandomSentenceQuizzes();

    List<String> getQuizAnswerCandidates();
}
