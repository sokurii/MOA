package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBalanceGameGood is a Querydsl query type for BalanceGameGood
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBalanceGameGood extends EntityPathBase<BalanceGameGood> {

    private static final long serialVersionUID = -12996566L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBalanceGameGood balanceGameGood = new QBalanceGameGood("balanceGameGood");

    public final QBalanceGame balanceGame;

    public final NumberPath<Long> balanceGameLikeId = createNumber("balanceGameLikeId", Long.class);

    public final NumberPath<Integer> balanceGameReaction = createNumber("balanceGameReaction", Integer.class);

    public final QMember member;

    public QBalanceGameGood(String variable) {
        this(BalanceGameGood.class, forVariable(variable), INITS);
    }

    public QBalanceGameGood(Path<? extends BalanceGameGood> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBalanceGameGood(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBalanceGameGood(PathMetadata metadata, PathInits inits) {
        this(BalanceGameGood.class, metadata, inits);
    }

    public QBalanceGameGood(Class<? extends BalanceGameGood> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.balanceGame = inits.isInitialized("balanceGame") ? new QBalanceGame(forProperty("balanceGame"), inits.get("balanceGame")) : null;
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
    }

}

