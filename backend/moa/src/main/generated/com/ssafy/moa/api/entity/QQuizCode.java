package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QQuizCode is a Querydsl query type for QuizCode
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QQuizCode extends EntityPathBase<QuizCode> {

    private static final long serialVersionUID = -1588408989L;

    public static final QQuizCode quizCode1 = new QQuizCode("quizCode1");

    public final ListPath<DailyKoreanQuiz, QDailyKoreanQuiz> dailyKoreanQuizList = this.<DailyKoreanQuiz, QDailyKoreanQuiz>createList("dailyKoreanQuizList", DailyKoreanQuiz.class, QDailyKoreanQuiz.class, PathInits.DIRECT2);

    public final NumberPath<Long> quizCode = createNumber("quizCode", Long.class);

    public final StringPath quizName = createString("quizName");

    public QQuizCode(String variable) {
        super(QuizCode.class, forVariable(variable));
    }

    public QQuizCode(Path<? extends QuizCode> path) {
        super(path.getType(), path.getMetadata());
    }

    public QQuizCode(PathMetadata metadata) {
        super(QuizCode.class, metadata);
    }

}

