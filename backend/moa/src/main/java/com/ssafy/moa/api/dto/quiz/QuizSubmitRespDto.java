package com.ssafy.moa.api.dto.quiz;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QuizSubmitRespDto {

    private Long quizId;
    private Boolean isQuizCorrect;
    private String quizAnswer;

    @Builder
    public QuizSubmitRespDto(Long quizId, Boolean isQuizCorrect, String quizAnswer) {
        this.quizId = quizId;
        this.isQuizCorrect = isQuizCorrect;
        this.quizAnswer = quizAnswer;
    }

    @Override
    public String toString() {
        return "QuizSubmitRespDto{" +
                "quizId=" + quizId +
                ", isQuizCorrect=" + isQuizCorrect +
                ", quizAnswer='" + quizAnswer + '\'' +
                '}';
    }
}
