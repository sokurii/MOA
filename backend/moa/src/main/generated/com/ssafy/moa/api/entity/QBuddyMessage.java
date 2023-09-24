package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QBuddyMessage is a Querydsl query type for BuddyMessage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QBuddyMessage extends EntityPathBase<BuddyMessage> {

    private static final long serialVersionUID = -445026974L;

    public static final QBuddyMessage buddyMessage = new QBuddyMessage("buddyMessage");

    public final StringPath message = createString("message");

    public final NumberPath<Long> messageId = createNumber("messageId", Long.class);

    public final NumberPath<Long> roomId = createNumber("roomId", Long.class);

    public final StringPath sender = createString("sender");

    public final DateTimePath<java.time.LocalDateTime> time = createDateTime("time", java.time.LocalDateTime.class);

    public QBuddyMessage(String variable) {
        super(BuddyMessage.class, forVariable(variable));
    }

    public QBuddyMessage(Path<? extends BuddyMessage> path) {
        super(path.getType(), path.getMetadata());
    }

    public QBuddyMessage(PathMetadata metadata) {
        super(BuddyMessage.class, metadata);
    }

}

