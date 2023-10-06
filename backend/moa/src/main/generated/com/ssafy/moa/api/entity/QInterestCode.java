package com.ssafy.moa.api.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QInterestCode is a Querydsl query type for InterestCode
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QInterestCode extends EntityPathBase<InterestCode> {

    private static final long serialVersionUID = 406402872L;

    public static final QInterestCode interestCode1 = new QInterestCode("interestCode1");

    public final ListPath<Interest, QInterest> interest = this.<Interest, QInterest>createList("interest", Interest.class, QInterest.class, PathInits.DIRECT2);

    public final NumberPath<Integer> interestCode = createNumber("interestCode", Integer.class);

    public final StringPath interestName = createString("interestName");

    public QInterestCode(String variable) {
        super(InterestCode.class, forVariable(variable));
    }

    public QInterestCode(Path<? extends InterestCode> path) {
        super(path.getType(), path.getMetadata());
    }

    public QInterestCode(PathMetadata metadata) {
        super(InterestCode.class, metadata);
    }

}

