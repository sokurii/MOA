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

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMember member = new QMember("member1");

    public final ListPath<BalanceGame, QBalanceGame> balanceGame = this.<BalanceGame, QBalanceGame>createList("balanceGame", BalanceGame.class, QBalanceGame.class, PathInits.DIRECT2);

    public final ListPath<BalanceGameGood, QBalanceGameGood> balanceGameGood = this.<BalanceGameGood, QBalanceGameGood>createList("balanceGameGood", BalanceGameGood.class, QBalanceGameGood.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final ListPath<ExchangeDiary, QExchangeDiary> exchangeDiary = this.<ExchangeDiary, QExchangeDiary>createList("exchangeDiary", ExchangeDiary.class, QExchangeDiary.class, PathInits.DIRECT2);

    public final QForeigner foreigner;

    public final ListPath<Interest, QInterest> interest = this.<Interest, QInterest>createList("interest", Interest.class, QInterest.class, PathInits.DIRECT2);

    public final QKorean korean;

    public final StringPath memberEmail = createString("memberEmail");

    public final NumberPath<Integer> memberExp = createNumber("memberExp", Integer.class);

    public final NumberPath<Integer> memberGender = createNumber("memberGender", Integer.class);

    public final NumberPath<Long> memberId = createNumber("memberId", Long.class);

    public final BooleanPath memberIsForeigner = createBoolean("memberIsForeigner");

    public final QLevel memberLevel;

    public final StringPath memberName = createString("memberName");

    public final StringPath memberPassword = createString("memberPassword");

    public final DateTimePath<java.time.LocalDateTime> modifiedAt = createDateTime("modifiedAt", java.time.LocalDateTime.class);

    public final ListPath<OpenChat, QOpenChat> openChat = this.<OpenChat, QOpenChat>createList("openChat", OpenChat.class, QOpenChat.class, PathInits.DIRECT2);

    public final ListPath<OpenChatMember, QOpenChatMember> openChatMember = this.<OpenChatMember, QOpenChatMember>createList("openChatMember", OpenChatMember.class, QOpenChatMember.class, PathInits.DIRECT2);

    public QMember(String variable) {
        this(Member.class, forVariable(variable), INITS);
    }

    public QMember(Path<? extends Member> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMember(PathMetadata metadata, PathInits inits) {
        this(Member.class, metadata, inits);
    }

    public QMember(Class<? extends Member> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.foreigner = inits.isInitialized("foreigner") ? new QForeigner(forProperty("foreigner"), inits.get("foreigner")) : null;
        this.korean = inits.isInitialized("korean") ? new QKorean(forProperty("korean"), inits.get("korean")) : null;
        this.memberLevel = inits.isInitialized("memberLevel") ? new QLevel(forProperty("memberLevel")) : null;
    }

}

