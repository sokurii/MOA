package com.ssafy.moa.api.service;


import com.ssafy.moa.api.dto.quiz.*;

import java.util.List;

public interface QuizService {
    List<QuizQuestionDto> questionWordQuiz();

    QuizSubmitRespDto submitWordQuiz(Long memberId, QuizSubmitReqDto quizSubmitReqDto);

    QuizFinishRespDto finishQuiz(Long memberId, QuizFinishReqDto quizFinishReqDto);
    List<QuizQuestionDto> questionSentenceQuiz();

    QuizWrongCountDto getWrongQuizCount(Long memberId);

    List<QuizQuestionDto> submitWrongQuiz(Long memberId, QuizWrongCountDto quizWrongCountDto);

    Long deleteWrongQuiz(Long memberId, Long quizId);
}
