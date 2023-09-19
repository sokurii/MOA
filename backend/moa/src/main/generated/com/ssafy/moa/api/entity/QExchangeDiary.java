package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QExchangeDiary is a Querydsl query type for ExchangeDiary
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QExchangeDiary extends EntityPathBase<ExchangeDiary> {

    private static final long serialVersionUID = -1249537921L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QExchangeDiary exchangeDiary = new QExchangeDiary("exchangeDiary");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final StringPath exchangeDiaryContent = createString("exchangeDiaryContent");

    public final DateTimePath<java.time.LocalDateTime> exchangeDiaryDate = createDateTime("exchangeDiaryDate", java.time.LocalDateTime.class);

    public final NumberPath<Long> exchangeDiaryId = createNumber("exchangeDiaryId", Long.class);

    public final StringPath exchangeDiaryPicture = createString("exchangeDiaryPicture");

    public final StringPath exchangeDiaryTitle = createString("exchangeDiaryTitle");

    public final QMember member;

    public final DateTimePath<java.time.LocalDateTime> updatedAt = createDateTime("updatedAt", java.time.LocalDateTime.class);

    public QExchangeDiary(String variable) {
        this(ExchangeDiary.class, forVariable(variable), INITS);
    }

    public QExchangeDiary(Path<? extends ExchangeDiary> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QExchangeDiary(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QExchangeDiary(PathMetadata metadata, PathInits inits) {
        this(ExchangeDiary.class, metadata, inits);
    }

    public QExchangeDiary(Class<? extends ExchangeDiary> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
    }

}

