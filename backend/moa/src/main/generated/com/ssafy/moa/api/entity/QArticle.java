package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QArticle is a Querydsl query type for Article
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QArticle extends EntityPathBase<Article> {

    private static final long serialVersionUID = -472769195L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QArticle article = new QArticle("article");

    public final StringPath articleContent = createString("articleContent");

    public final NumberPath<Long> articleId = createNumber("articleId", Long.class);

    public final StringPath articleLink = createString("articleLink");

    public final NumberPath<Long> articleOriginId = createNumber("articleOriginId", Long.class);

    public final StringPath articleTitle = createString("articleTitle");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final QMember member;

    public QArticle(String variable) {
        this(Article.class, forVariable(variable), INITS);
    }

    public QArticle(Path<? extends Article> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QArticle(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QArticle(PathMetadata metadata, PathInits inits) {
        this(Article.class, metadata, inits);
    }

    public QArticle(Class<? extends Article> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
    }

}

