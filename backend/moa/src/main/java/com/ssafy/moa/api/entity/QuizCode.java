package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class QuizCode {

    @Id
    private Long quizCode;

    @Column(length = 100)
    private String  quizName;

    @OneToMany(mappedBy = "quizCode")
    private List<DailyKoreanQuiz> dailyKoreanQuizList;


}
