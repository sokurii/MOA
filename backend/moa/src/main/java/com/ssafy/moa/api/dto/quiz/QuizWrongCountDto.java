package com.ssafy.moa.api.dto.quiz;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class QuizWrongCountDto {

    private Integer quizWrongCount;

    @Builder
    public QuizWrongCountDto(Integer quizWrongCount) {
        this.quizWrongCount = quizWrongCount;
    }

}
