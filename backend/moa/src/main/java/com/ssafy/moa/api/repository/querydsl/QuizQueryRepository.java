package com.ssafy.moa.api.repository.querydsl;

import com.ssafy.moa.api.dto.quiz.QuizQuestionDto;
import java.util.List;

public interface QuizQueryRepository {

    List<QuizQuestionDto> getRandomQuizzes();

}