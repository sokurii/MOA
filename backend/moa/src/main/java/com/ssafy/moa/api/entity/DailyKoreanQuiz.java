package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class DailyKoreanQuiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long quizId;

    @NotNull
    @Column(length = 500)
    private String quizQuestion;

    @NotNull
    @Column(length = 500)
    private String quizAnswer;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "quiz_code")
    private QuizCode quizCode;

    @OneToOne(mappedBy = "quiz")
    private QuizWrongAnswer quizWrongAnswer;
}
