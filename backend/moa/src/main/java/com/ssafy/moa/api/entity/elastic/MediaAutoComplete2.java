package com.ssafy.moa.api.entity.elastic;

import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.elasticsearch.annotations.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(indexName = "media-info-auto-complete")
@Mapping(mappingPath = "elastic/media-mapping.json")
@Setting(settingPath = "elastic/media-setting.json")
public class MediaAutoComplete2 {
    @Id
    private String id;

    @Field(type = FieldType.Text)
    private String column1;

    @Field(type = FieldType.Text, analyzer = "my_ngram_analyzer", searchAnalyzer = "standard")
    private String titleNm;

    @Builder
    public MediaAutoComplete2(String column1, String titleNm) {
        this.column1 = column1;
        this.titleNm = titleNm;
    }
}
