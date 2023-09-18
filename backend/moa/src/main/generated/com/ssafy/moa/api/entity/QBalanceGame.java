package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBalanceGame is a Querydsl query type for BalanceGame
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBalanceGame extends EntityPathBase<BalanceGame> {

    private static final long serialVersionUID = -106206771L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBalanceGame balanceGame = new QBalanceGame("balanceGame");

    public final NumberPath<Integer> badCount = createNumber("badCount", Integer.class);

    public final NumberPath<Long> balanceGameId = createNumber("balanceGameId", Long.class);

    public final ListPath<BalanceGameList, QBalanceGameList> balanceGameList = this.<BalanceGameList, QBalanceGameList>createList("balanceGameList", BalanceGameList.class, QBalanceGameList.class, PathInits.DIRECT2);

    public final NumberPath<Integer> balanceGameTime = createNumber("balanceGameTime", Integer.class);

    public final StringPath balanceGameTitle = createString("balanceGameTitle");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Integer> goodCount = createNumber("goodCount", Integer.class);

    public final QMember member;

    public final NumberPath<Integer> normalCount = createNumber("normalCount", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> updatedAt = createDateTime("updatedAt", java.time.LocalDateTime.class);

    public QBalanceGame(String variable) {
        this(BalanceGame.class, forVariable(variable), INITS);
    }

    public QBalanceGame(Path<? extends BalanceGame> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBalanceGame(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBalanceGame(PathMetadata metadata, PathInits inits) {
        this(BalanceGame.class, metadata, inits);
    }

    public QBalanceGame(Class<? extends BalanceGame> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
    }

}

