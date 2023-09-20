package com.ssafy.moa.api.repository.querydsl;


import com.querydsl.core.Tuple;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.MathExpressions;
import com.querydsl.core.types.dsl.NumberExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.moa.api.dto.quiz.QuizQuestionDto;
import com.ssafy.moa.api.entity.QDailyKoreanQuiz;
import com.ssafy.moa.api.entity.QQuizCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Repository
@RequiredArgsConstructor
public class QuizQueryRepositoryImpl implements QuizQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<QuizQuestionDto> getRandomQuizzes() {
        QDailyKoreanQuiz dailyKoreanQuiz = QDailyKoreanQuiz.dailyKoreanQuiz;
        QQuizCode quizCode = QQuizCode.quizCode1;

        List<Tuple> tuples = jpaQueryFactory
                .select(dailyKoreanQuiz.quizId, dailyKoreanQuiz.quizQuestion, dailyKoreanQuiz.quizAnswer,
                        quizCode.quizCode, quizCode.quizName)
                .from(dailyKoreanQuiz)
                .innerJoin(quizCode).on(dailyKoreanQuiz.quizCode.eq(quizCode))
                .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                .limit(15)
                .fetch();

        List<QuizQuestionDto> quizQuestionDtoList = new ArrayList<>();
        for(Tuple tuple : tuples) {
            QuizQuestionDto quizQuestionDto = QuizQuestionDto.builder()
                    .quizId(tuple.get(dailyKoreanQuiz.quizId))
                    .quizAnswer(tuple.get(dailyKoreanQuiz.quizQuestion))
                    .quizQuestion(tuple.get(dailyKoreanQuiz.quizAnswer))
                    .quizCategoryId(tuple.get(quizCode.quizCode))
                    .quizCategoryName(tuple.get(quizCode.quizName))
                    .build();
            quizQuestionDtoList.add(quizQuestionDto);
        }

        return quizQuestionDtoList;
    }
}
