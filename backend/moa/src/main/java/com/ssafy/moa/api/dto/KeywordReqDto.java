package com.ssafy.moa.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class KeywordReqDto {
    private String keywordName;

    @Builder
    public KeywordReqDto(String keywordName) {
        this.keywordName = keywordName;
    }
}
