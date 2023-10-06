package com.ssafy.moa.api.repository.querydsl;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.moa.api.dto.quiz.QuizQuestionDto;
import com.ssafy.moa.api.entity.DailyKoreanQuiz;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.entity.QuizWrongAnswer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.beans.Expression;
import java.util.ArrayList;
import java.util.List;

import static com.ssafy.moa.api.entity.QQuizWrongAnswer.quizWrongAnswer;
import static com.ssafy.moa.api.entity.QDailyKoreanQuiz.dailyKoreanQuiz;
import static com.ssafy.moa.api.entity.QQuizCode.quizCode1;

@Repository
@RequiredArgsConstructor
public class QuizWrongAnswerQueryRepositoryImpl implements QuizWrongAnswerQueryRepository {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Long getWrongQuizCount(Long memberId) {
        return jpaQueryFactory.select(quizWrongAnswer.count())
                .from(quizWrongAnswer)
                .where(quizWrongAnswer.member.memberId.eq(memberId))
                .fetchOne();
    }

    @Override
    public List<QuizQuestionDto> getRandomWrongQuizzes(Long memberId, Integer wrongQuizCount) {
        List<Tuple> tuples = jpaQueryFactory
                .select(quizWrongAnswer.quiz.quizId, dailyKoreanQuiz.quizQuestion, dailyKoreanQuiz.quizAnswer,
                        quizCode1.quizCode, quizCode1.quizName)
                .from(quizWrongAnswer)
                .innerJoin(dailyKoreanQuiz).on(quizWrongAnswer.quiz.eq(dailyKoreanQuiz))
                .leftJoin(quizCode1).on(dailyKoreanQuiz.quizCode.eq(quizCode1))
                .where(quizWrongAnswer.member.memberId.eq(memberId))
                .orderBy(Expressions.numberTemplate(Double.class,"function('rand')").asc())
                .limit(wrongQuizCount)
                .fetch();

        List<QuizQuestionDto> quizQuestionDtoList = new ArrayList<>();
        for(Tuple tuple : tuples) {
            QuizQuestionDto quizQuestionDto = QuizQuestionDto.builder()
                    .quizId(tuple.get(quizWrongAnswer.quiz.quizId))
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
    public Long deleteWrongQuiz(Long memberId, Long quizId) {
        return jpaQueryFactory.delete(quizWrongAnswer)
                .where(quizWrongAnswer.member.memberId.eq(memberId)
                        .and(quizWrongAnswer.quiz.quizId.eq(quizId)))
                .execute();
    }


}
