package com.ssafy.moa.api.entity.elastic;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(indexName = "media-info-auto-complete2")
@Mapping(mappingPath = "elastic/media-mapping.json")
@Setting(settingPath = "elastic/media-setting.json")
public class MediaAutoComplete {
    @Id
    private String id;

    @Field(type = FieldType.Text)
    private String placeNm;

    @Field(type = FieldType.Integer)
    private Integer seqNo;

    @Field(type = FieldType.Text, analyzer = "my_ngram_analyzer", searchAnalyzer = "standard")
    private String titleNm;

    @Field(type = FieldType.Text, analyzer = "my_ngram_analyzer", searchAnalyzer = "standard")
    private String relatePlaceDc;

    @Builder
    public MediaAutoComplete(String id, String placeNm, Integer seqNo, String titleNm, String relatePlaceDc) {
        this.id = id;
        this.placeNm = placeNm;
        this.seqNo = seqNo;
        this.titleNm = titleNm;
        this.relatePlaceDc = relatePlaceDc;
    }
}
