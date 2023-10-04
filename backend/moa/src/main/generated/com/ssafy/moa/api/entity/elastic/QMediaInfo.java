package com.ssafy.moa.api.entity.elastic;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMediaInfo is a Querydsl query type for MediaInfo
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMediaInfo extends EntityPathBase<MediaInfo> {

    private static final long serialVersionUID = -983335816L;

    public static final QMediaInfo mediaInfo = new QMediaInfo("mediaInfo");

    public final StringPath addr = createString("addr");

    public final StringPath description = createString("description");

    public final StringPath id = createString("id");

    public final NumberPath<Integer> lastUpdtDe = createNumber("lastUpdtDe", Integer.class);

    public final NumberPath<Float> latitude = createNumber("latitude", Float.class);

    public final NumberPath<Float> longitude = createNumber("longitude", Float.class);

    public final StringPath mediaTy = createString("mediaTy");

    public final StringPath operTime = createString("operTime");

    public final StringPath placeNm = createString("placeNm");

    public final StringPath placeTy = createString("placeTy");

    public final StringPath relatePlaceDc = createString("relatePlaceDc");

    public final StringPath restTime = createString("restTime");

    public final StringPath rstdeQuidCn = createString("rstdeQuidCn");

    public final NumberPath<Integer> seqNo = createNumber("seqNo", Integer.class);

    public final NumberPath<Long> telNo = createNumber("telNo", Long.class);

    public final StringPath titleNm = createString("titleNm");

    public QMediaInfo(String variable) {
        super(MediaInfo.class, forVariable(variable));
    }

    public QMediaInfo(Path<? extends MediaInfo> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMediaInfo(PathMetadata metadata) {
        super(MediaInfo.class, metadata);
    }

}

