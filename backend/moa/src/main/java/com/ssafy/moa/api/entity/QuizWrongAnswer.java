package com.ssafy.moa.api.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class QuizWrongAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wrongQuizAnswerId;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "quiz_id")
    private DailyKoreanQuiz quiz;

    @Builder
    public QuizWrongAnswer(Member member, DailyKoreanQuiz quiz) {
        this.member = member;
        this.quiz = quiz;
    }

    @Override
    public String toString() {
        return "QuizWrongAnswer{" +
                "wrongQuizAnswerId=" + wrongQuizAnswerId +
                ", member=" + member +
                ", quiz=" + quiz +
                '}';
    }
}
