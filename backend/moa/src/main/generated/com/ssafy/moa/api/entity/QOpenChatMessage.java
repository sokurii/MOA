package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QOpenChatMessage is a Querydsl query type for OpenChatMessage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOpenChatMessage extends EntityPathBase<OpenChatMessage> {

    private static final long serialVersionUID = 797647428L;

    public static final QOpenChatMessage openChatMessage = new QOpenChatMessage("openChatMessage");

    public final StringPath message = createString("message");

    public final NumberPath<Long> messageId = createNumber("messageId", Long.class);

    public final NumberPath<Long> roomId = createNumber("roomId", Long.class);

    public final StringPath sender = createString("sender");

    public final DateTimePath<java.time.LocalDateTime> time = createDateTime("time", java.time.LocalDateTime.class);

    public QOpenChatMessage(String variable) {
        super(OpenChatMessage.class, forVariable(variable));
    }

    public QOpenChatMessage(Path<? extends OpenChatMessage> path) {
        super(path.getType(), path.getMetadata());
    }

    public QOpenChatMessage(PathMetadata metadata) {
        super(OpenChatMessage.class, metadata);
    }

}

