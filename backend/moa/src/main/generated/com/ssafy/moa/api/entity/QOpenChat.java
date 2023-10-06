package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QOpenChat is a Querydsl query type for OpenChat
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOpenChat extends EntityPathBase<OpenChat> {

    private static final long serialVersionUID = -1047219133L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QOpenChat openChat = new QOpenChat("openChat");

    public final QMember member;

    public final StringPath openChatContent = createString("openChatContent");

    public final NumberPath<Long> openChatId = createNumber("openChatId", Long.class);

    public final StringPath openChatImgUrl = createString("openChatImgUrl");

    public final ListPath<OpenChatMember, QOpenChatMember> openChatMember = this.<OpenChatMember, QOpenChatMember>createList("openChatMember", OpenChatMember.class, QOpenChatMember.class, PathInits.DIRECT2);

    public final StringPath openChatTitle = createString("openChatTitle");

    public QOpenChat(String variable) {
        this(OpenChat.class, forVariable(variable), INITS);
    }

    public QOpenChat(Path<? extends OpenChat> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QOpenChat(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QOpenChat(PathMetadata metadata, PathInits inits) {
        this(OpenChat.class, metadata, inits);
    }

    public QOpenChat(Class<? extends OpenChat> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
    }

}

