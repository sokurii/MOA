package com.ssafy.moa.api.dto.scrap;

import com.ssafy.moa.api.entity.Word;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class WordReqDto {
    private String wordName;
    private String wordMean;

    @Builder
    public WordReqDto(String wordName, String wordMean) {
        this.wordName = wordName;
        this.wordMean = wordMean;
    }

    @Override
    public String toString() {
        return "WordDto{" +
                "wordName='" + wordName + '\'' +
                ", wordMean='" + wordMean + '\'' +
                '}';
    }
}
