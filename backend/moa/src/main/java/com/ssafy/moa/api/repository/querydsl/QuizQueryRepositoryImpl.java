package com.ssafy.moa.api.repository.querydsl;


import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.moa.api.dto.quiz.QuizQuestionDto;
import static com.ssafy.moa.api.entity.QDailyKoreanQuiz.dailyKoreanQuiz;
import static com.ssafy.moa.api.entity.QQuizCode.quizCode1;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class QuizQueryRepositoryImpl implements QuizQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<QuizQuestionDto> getRandomQuizzes() {

        List<Tuple> tuples = jpaQueryFactory
                .select(dailyKoreanQuiz.quizId, dailyKoreanQuiz.quizQuestion, dailyKoreanQuiz.quizAnswer,
                        quizCode1.quizCode, quizCode1.quizName)
                .from(dailyKoreanQuiz)
                .innerJoin(quizCode1).on(dailyKoreanQuiz.quizCode.eq(quizCode1))
                .where(dailyKoreanQuiz.quizCode.quizCode.eq(1L).or(dailyKoreanQuiz.quizCode.quizCode.eq(2L)))
                .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                .limit(15)
                .fetch();

        List<QuizQuestionDto> quizQuestionDtoList = new ArrayList<>();
        for(Tuple tuple : tuples) {
            QuizQuestionDto quizQuestionDto = QuizQuestionDto.builder()
                    .quizId(tuple.get(dailyKoreanQuiz.quizId))
                    .quizAnswer(tuple.get(dailyKoreanQuiz.quizAnswer))
                    .quizQuestion(tuple.get(dailyKoreanQuiz.quizQuestion))
                    .quizCategoryId(tuple.get(quizCode1.quizCode))
                    .quizCategoryName(tuple.get(quizCode1.quizName))
                    .build();
            quizQuestionDtoList.add(quizQuestionDto);
        }

        return quizQuestionDtoList;
    }

    @Override
    public List<String> getWordQuizAnswerList(String quizAnswer) {
        return jpaQueryFactory
                .select(dailyKoreanQuiz.quizAnswer)
                .from(dailyKoreanQuiz)
                .where(dailyKoreanQuiz.quizCode.quizCode.eq(1L))
                .where(dailyKoreanQuiz.quizAnswer.ne(quizAnswer))
                .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                .limit(3)
                .fetch();
    }

    @Override
    public List<QuizQuestionDto> getRandomSentenceQuizzes() {

        List<Tuple> tuples = jpaQueryFactory
                .select(dailyKoreanQuiz.quizId, dailyKoreanQuiz.quizQuestion, dailyKoreanQuiz.quizAnswer,
                        quizCode1.quizCode, quizCode1.quizName)
                .from(dailyKoreanQuiz)
                .innerJoin(quizCode1).on(dailyKoreanQuiz.quizCode.eq(quizCode1))
                .where(dailyKoreanQuiz.quizCode.quizCode.eq(3L).or(dailyKoreanQuiz.quizCode.quizCode.eq(4L)))
                .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                .limit(15)
                .fetch();

        List<QuizQuestionDto> quizQuestionDtoList = new ArrayList<>();
        for(Tuple tuple : tuples) {
            QuizQuestionDto quizQuestionDto = QuizQuestionDto.builder()
                    .quizId(tuple.get(dailyKoreanQuiz.quizId))
                    .quizAnswer(tuple.get(dailyKoreanQuiz.quizAnswer))
                    .quizQuestion(tuple.get(dailyKoreanQuiz.quizQuestion))
                    .quizCategoryId(tuple.get(quizCode1.quizCode))
                    .quizCategoryName(tuple.get(quizCode1.quizName))
                    .build();
            quizQuestionDtoList.add(quizQuestionDto);
        }

        return quizQuestionDtoList;
    }

    @Override
    public List<String> getQuizAnswerCandidates() {
        return jpaQueryFactory
                .select(dailyKoreanQuiz.quizAnswer)
                .from(dailyKoreanQuiz)
                .where(dailyKoreanQuiz.quizCode.quizCode.eq(1L))
                .orderBy(Expressions.numberTemplate(Double.class, "function('rand')").asc())
                .limit(9)
                .fetch();
    }
}
