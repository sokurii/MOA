package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QBalanceGameList is a Querydsl query type for BalanceGameList
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBalanceGameList extends EntityPathBase<BalanceGameList> {

    private static final long serialVersionUID = -12853237L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QBalanceGameList balanceGameList = new QBalanceGameList("balanceGameList");

    public final QBalanceGame balanceGame;

    public final NumberPath<Long> balanceGameListId = createNumber("balanceGameListId", Long.class);

    public final StringPath balanceGameOne = createString("balanceGameOne");

    public final StringPath balanceGameTwo = createString("balanceGameTwo");

    public final NumberPath<Integer> balanceOrder = createNumber("balanceOrder", Integer.class);

    public QBalanceGameList(String variable) {
        this(BalanceGameList.class, forVariable(variable), INITS);
    }

    public QBalanceGameList(Path<? extends BalanceGameList> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QBalanceGameList(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QBalanceGameList(PathMetadata metadata, PathInits inits) {
        this(BalanceGameList.class, metadata, inits);
    }

    public QBalanceGameList(Class<? extends BalanceGameList> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.balanceGame = inits.isInitialized("balanceGame") ? new QBalanceGame(forProperty("balanceGame"), inits.get("balanceGame")) : null;
    }

}

