package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QNationCode is a Querydsl query type for NationCode
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QNationCode extends EntityPathBase<NationCode> {

    private static final long serialVersionUID = 1677415701L;

    public static final QNationCode nationCode1 = new QNationCode("nationCode1");

    public final ListPath<Foreigner, QForeigner> foreigner = this.<Foreigner, QForeigner>createList("foreigner", Foreigner.class, QForeigner.class, PathInits.DIRECT2);

    public final ListPath<Korean, QKorean> korean = this.<Korean, QKorean>createList("korean", Korean.class, QKorean.class, PathInits.DIRECT2);

    public final NumberPath<Integer> nationCode = createNumber("nationCode", Integer.class);

    public final StringPath nationName = createString("nationName");

    public QNationCode(String variable) {
        super(NationCode.class, forVariable(variable));
    }

    public QNationCode(Path<? extends NationCode> path) {
        super(path.getType(), path.getMetadata());
    }

    public QNationCode(PathMetadata metadata) {
        super(NationCode.class, metadata);
    }

}

