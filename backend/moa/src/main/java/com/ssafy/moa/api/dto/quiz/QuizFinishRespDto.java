package com.ssafy.moa.api.dto.quiz;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QuizFinishRespDto {
    private String quizMessage;
    private Integer memberGetExp;

    @Builder
    public QuizFinishRespDto(String quizMessage, Integer memberGetExp) {
        this.quizMessage = quizMessage;
        this.memberGetExp = memberGetExp;
    }

    @Override
    public String toString() {
        return "QuizFinishRespDto{" +
                "quizMessage='" + quizMessage + '\'' +
                ", memberGetExp=" + memberGetExp +
                '}';
    }
}
