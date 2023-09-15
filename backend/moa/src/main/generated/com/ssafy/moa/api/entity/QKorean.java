package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QKorean is a Querydsl query type for Korean
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QKorean extends EntityPathBase<Korean> {

    private static final long serialVersionUID = -1394361147L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QKorean korean = new QKorean("korean");

    public final QBuddy buddy;

    public final NumberPath<Long> koreanId = createNumber("koreanId", Long.class);

    public final NumberPath<Integer> koreanLikeGender = createNumber("koreanLikeGender", Integer.class);

    public final QMember member;

    public final QNationCode nationCode;

    public QKorean(String variable) {
        this(Korean.class, forVariable(variable), INITS);
    }

    public QKorean(Path<? extends Korean> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QKorean(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QKorean(PathMetadata metadata, PathInits inits) {
        this(Korean.class, metadata, inits);
    }

    public QKorean(Class<? extends Korean> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.buddy = inits.isInitialized("buddy") ? new QBuddy(forProperty("buddy"), inits.get("buddy")) : null;
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
        this.nationCode = inits.isInitialized("nationCode") ? new QNationCode(forProperty("nationCode")) : null;
    }

}

