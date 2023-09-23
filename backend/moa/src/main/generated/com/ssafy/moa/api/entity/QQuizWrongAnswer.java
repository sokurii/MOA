package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QQuizWrongAnswer is a Querydsl query type for QuizWrongAnswer
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QQuizWrongAnswer extends EntityPathBase<QuizWrongAnswer> {

    private static final long serialVersionUID = 1574409109L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QQuizWrongAnswer quizWrongAnswer = new QQuizWrongAnswer("quizWrongAnswer");

    public final QMember member;

    public final QDailyKoreanQuiz quiz;

    public final NumberPath<Long> wrongQuizAnswerId = createNumber("wrongQuizAnswerId", Long.class);

    public QQuizWrongAnswer(String variable) {
        this(QuizWrongAnswer.class, forVariable(variable), INITS);
    }

    public QQuizWrongAnswer(Path<? extends QuizWrongAnswer> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QQuizWrongAnswer(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QQuizWrongAnswer(PathMetadata metadata, PathInits inits) {
        this(QuizWrongAnswer.class, metadata, inits);
    }

    public QQuizWrongAnswer(Class<? extends QuizWrongAnswer> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
        this.quiz = inits.isInitialized("quiz") ? new QDailyKoreanQuiz(forProperty("quiz"), inits.get("quiz")) : null;
    }

}

