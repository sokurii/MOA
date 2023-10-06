package com.ssafy.moa.api.dto.quiz;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QuizSubmitReqDto {

    private Long quizId;
    private String quizSubmitAnswer;

    @Override
    public String toString() {
        return "QuizSubmitReqDto{" +
                "quizId=" + quizId +
                ", quizSubmitAnswer='" + quizSubmitAnswer + '\'' +
                '}';
    }
}
