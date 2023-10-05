package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QDailyKoreanQuiz is a Querydsl query type for DailyKoreanQuiz
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDailyKoreanQuiz extends EntityPathBase<DailyKoreanQuiz> {

    private static final long serialVersionUID = -1206142511L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QDailyKoreanQuiz dailyKoreanQuiz = new QDailyKoreanQuiz("dailyKoreanQuiz");

    public final StringPath quizAnswer = createString("quizAnswer");

    public final QQuizCode quizCode;

    public final NumberPath<Long> quizId = createNumber("quizId", Long.class);

    public final StringPath quizQuestion = createString("quizQuestion");

    public final ListPath<QuizWrongAnswer, QQuizWrongAnswer> quizWrongAnswer = this.<QuizWrongAnswer, QQuizWrongAnswer>createList("quizWrongAnswer", QuizWrongAnswer.class, QQuizWrongAnswer.class, PathInits.DIRECT2);

    public QDailyKoreanQuiz(String variable) {
        this(DailyKoreanQuiz.class, forVariable(variable), INITS);
    }

    public QDailyKoreanQuiz(Path<? extends DailyKoreanQuiz> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QDailyKoreanQuiz(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QDailyKoreanQuiz(PathMetadata metadata, PathInits inits) {
        this(DailyKoreanQuiz.class, metadata, inits);
    }

    public QDailyKoreanQuiz(Class<? extends DailyKoreanQuiz> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.quizCode = inits.isInitialized("quizCode") ? new QQuizCode(forProperty("quizCode")) : null;
    }

}

