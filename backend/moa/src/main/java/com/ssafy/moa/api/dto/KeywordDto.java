package com.ssafy.moa.api.dto;

import com.ssafy.moa.api.entity.Keyword;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class KeywordDto {
    private Long keywordId;
    private String keywordName;

    @Builder
    public KeywordDto(Long keywordId, String keywordName) {
        this.keywordId = keywordId;
        this.keywordName = keywordName;
    }

    public static KeywordDto from(Keyword keyword){
        return new KeywordDto(keyword.getKeywordId(), keyword.getKeywordName());
    }
}
