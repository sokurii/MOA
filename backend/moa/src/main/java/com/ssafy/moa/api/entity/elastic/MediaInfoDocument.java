package com.ssafy.moa.api.entity.elastic;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(indexName = "media-info-imgs")
@Mapping(mappingPath = "elastic/media-mapping.json")
@Setting(settingPath = "elastic/media-setting.json")
public class MediaInfoDocument {
    @Id
    private String id;

    @Field(type = FieldType.Text)
    private String placeNm;

    @Field(type = FieldType.Text)
    private String placeTy;

    @Field(type = FieldType.Text)
    private String operTime;

    @Field(type = FieldType.Text)
    private String restTime;

    @Field(type = FieldType.Text)
    private String rstdeQuidCn;

    @Field(type = FieldType.Text)
    private String addr;

    @Field(type = FieldType.Float)
    private Float latitude;

    @Field(type = FieldType.Float)
    private Float longitude;

    @Field(type = FieldType.Long, nullValue = "0")
    private Long telNo;

    @Field(type = FieldType.Integer)
    private Integer seqNo;

    @Field(type = FieldType.Text)
    private String mediaTy;

    @Field(type = FieldType.Text)
    private String titleNm;

    @Field(type = FieldType.Keyword)
    private String titleNmKind;

    @Field(type = FieldType.Text)
    private String relatePlaceDc;

    @Field(type = FieldType.Integer)
    private Integer lastUpdtDe;

    @Field(type = FieldType.Text, analyzer = "korean")
    private String description;

    @Field(type = FieldType.Text)
    private String realImg;

    @Builder
    public MediaInfoDocument(String id, String placeNm, String placeTy, String operTime, String restTime, String rstdeQuidCn, String addr, Float latitude, Float longitude, Long telNo, Integer seqNo, String mediaTy, String titleNm, String titleNmKind, String relatePlaceDc, Integer lastUpdtDe, String description, String realImg) {
        this.id = id;
        this.placeNm = placeNm;
        this.placeTy = placeTy;
        this.operTime = operTime;
        this.restTime = restTime;
        this.rstdeQuidCn = rstdeQuidCn;
        this.addr = addr;
        this.latitude = latitude;
        this.longitude = longitude;
        this.telNo = telNo;
        this.seqNo = seqNo;
        this.mediaTy = mediaTy;
        this.titleNm = titleNm;
        this.titleNmKind = titleNmKind;
        this.relatePlaceDc = relatePlaceDc;
        this.lastUpdtDe = lastUpdtDe;
        this.description = description;
        this.realImg = realImg;
    }

    @Override
    public String toString() {
        return "MediaInfoDocument{" +
                "id='" + id + '\'' +
                ", placeNm='" + placeNm + '\'' +
                ", placeTy='" + placeTy + '\'' +
                ", operTime='" + operTime + '\'' +
                ", restTime='" + restTime + '\'' +
                ", rstdeQuidCn='" + rstdeQuidCn + '\'' +
                ", addr='" + addr + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", telNo=" + telNo +
                ", seqNo=" + seqNo +
                ", mediaTy='" + mediaTy + '\'' +
                ", titleNm='" + titleNm + '\'' +
                ", titleNmKind='" + titleNmKind + '\'' +
                ", relatePlaceDc='" + relatePlaceDc + '\'' +
                ", lastUpdtDe=" + lastUpdtDe +
                ", description='" + description + '\'' +
                ", realImg='" + realImg + '\'' +
                '}';
    }
}
