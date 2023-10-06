package com.ssafy.moa.api.dto.quiz;

import com.ssafy.moa.api.entity.DailyKoreanQuiz;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class QuizQuestionDto {

    private Long quizId;
    private String quizQuestion;
    private String quizAnswer;
    private List<String> quizAnswerList;
    private Long quizCategoryId;
    private String quizCategoryName;

    @Builder
    public QuizQuestionDto(Long quizId, String quizQuestion, String quizAnswer, Long quizCategoryId, String quizCategoryName) {
        this.quizId = quizId;
        this.quizQuestion = quizQuestion;
        this.quizAnswer = quizAnswer;
        this.quizCategoryId = quizCategoryId;
        this.quizCategoryName = quizCategoryName;
    }

    @Override
    public String toString() {
        return "QuizQuestionDto{" +
                "quizId=" + quizId +
                ", quizQuestion='" + quizQuestion + '\'' +
                ", quizAnswer='" + quizAnswer + '\'' +
                ", quizAnswerList=" + quizAnswerList +
                ", quizCategoryId=" + quizCategoryId +
                ", quizCategoryName='" + quizCategoryName + '\'' +
                '}';
    }
}
