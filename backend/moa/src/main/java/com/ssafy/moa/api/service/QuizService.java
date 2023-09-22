package com.ssafy.moa.api.service;


import com.ssafy.moa.api.dto.quiz.*;

import java.util.List;

public interface QuizService {
    List<QuizQuestionDto> questionWordQuiz();

    QuizSubmitRespDto submitWordQuiz(QuizSubmitReqDto quizSubmitReqDto);

    QuizFinishRespDto finishQuiz(Long memberId, QuizFinishReqDto quizFinishReqDto);
}
