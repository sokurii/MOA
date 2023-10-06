package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QForeigner is a Querydsl query type for Foreigner
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QForeigner extends EntityPathBase<Foreigner> {

    private static final long serialVersionUID = 1965382944L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QForeigner foreigner = new QForeigner("foreigner");

    public final QBuddy buddy;

    public final NumberPath<Long> foreignerId = createNumber("foreignerId", Long.class);

    public final StringPath foreignerKoreaName = createString("foreignerKoreaName");

    public final NumberPath<Integer> foreignerLikeGender = createNumber("foreignerLikeGender", Integer.class);

    public final QMember member;

    public final QNationCode nationCode;

    public QForeigner(String variable) {
        this(Foreigner.class, forVariable(variable), INITS);
    }

    public QForeigner(Path<? extends Foreigner> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QForeigner(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QForeigner(PathMetadata metadata, PathInits inits) {
        this(Foreigner.class, metadata, inits);
    }

    public QForeigner(Class<? extends Foreigner> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.buddy = inits.isInitialized("buddy") ? new QBuddy(forProperty("buddy"), inits.get("buddy")) : null;
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
        this.nationCode = inits.isInitialized("nationCode") ? new QNationCode(forProperty("nationCode")) : null;
    }

}

