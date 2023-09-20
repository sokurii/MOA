package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QOpenChatMember is a Querydsl query type for OpenChatMember
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOpenChatMember extends EntityPathBase<OpenChatMember> {

    private static final long serialVersionUID = -2052674371L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QOpenChatMember openChatMember = new QOpenChatMember("openChatMember");

    public final QMember member;

    public final QOpenChat openChat;

    public final NumberPath<Long> openChatMemberId = createNumber("openChatMemberId", Long.class);

    public QOpenChatMember(String variable) {
        this(OpenChatMember.class, forVariable(variable), INITS);
    }

    public QOpenChatMember(Path<? extends OpenChatMember> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QOpenChatMember(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QOpenChatMember(PathMetadata metadata, PathInits inits) {
        this(OpenChatMember.class, metadata, inits);
    }

    public QOpenChatMember(Class<? extends OpenChatMember> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
        this.openChat = inits.isInitialized("openChat") ? new QOpenChat(forProperty("openChat"), inits.get("openChat")) : null;
    }

}

