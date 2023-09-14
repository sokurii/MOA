package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBuddy is a Querydsl query type for Buddy
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBuddy extends EntityPathBase<Buddy> {

    private static final long serialVersionUID = 362516197L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBuddy buddy = new QBuddy("buddy");

    public final NumberPath<Long> buddyId = createNumber("buddyId", Long.class);

    public final QForeigner foreigner;

    public final QKorean korean;

    public QBuddy(String variable) {
        this(Buddy.class, forVariable(variable), INITS);
    }

    public QBuddy(Path<? extends Buddy> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBuddy(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBuddy(PathMetadata metadata, PathInits inits) {
        this(Buddy.class, metadata, inits);
    }

    public QBuddy(Class<? extends Buddy> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.foreigner = inits.isInitialized("foreigner") ? new QForeigner(forProperty("foreigner"), inits.get("foreigner")) : null;
        this.korean = inits.isInitialized("korean") ? new QKorean(forProperty("korean"), inits.get("korean")) : null;
    }

}

