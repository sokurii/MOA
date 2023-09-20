package com.ssafy.moa.api.service;


import com.ssafy.moa.api.dto.quiz.QuizQuestionDto;

import java.util.List;

public interface QuizService {
    List<QuizQuestionDto> submitQuiz();
}
