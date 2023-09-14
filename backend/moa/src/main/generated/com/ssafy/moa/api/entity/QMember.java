package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -1346489765L;

    public static final QMember member = new QMember("member1");

    public final ListPath<BalanceGame, QBalanceGame> balanceGame = this.<BalanceGame, QBalanceGame>createList("balanceGame", BalanceGame.class, QBalanceGame.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final ListPath<Foreigner, QForeigner> foreigner = this.<Foreigner, QForeigner>createList("foreigner", Foreigner.class, QForeigner.class, PathInits.DIRECT2);

    public final ListPath<Interest, QInterest> interest = this.<Interest, QInterest>createList("interest", Interest.class, QInterest.class, PathInits.DIRECT2);

    public final ListPath<Korean, QKorean> korean = this.<Korean, QKorean>createList("korean", Korean.class, QKorean.class, PathInits.DIRECT2);

    public final StringPath memberEmail = createString("memberEmail");

    public final NumberPath<Integer> memberExp = createNumber("memberExp", Integer.class);

    public final NumberPath<Integer> memberGender = createNumber("memberGender", Integer.class);

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final BooleanPath memberIsForeigner = createBoolean("memberIsForeigner");

    public final StringPath memberName = createString("memberName");

    public final StringPath memberPassword = createString("memberPassword");

    public final DateTimePath<java.time.LocalDateTime> modifiedAt = createDateTime("modifiedAt", java.time.LocalDateTime.class);

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

