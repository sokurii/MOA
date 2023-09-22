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
public class WordDto {
    private Long wordId;
    private String wordName;
    private String wordMean;
    private LocalDateTime createdAt;

    @Builder
    public WordDto(Long wordId, String wordName, String wordMean, LocalDateTime createdAt) {
        this.wordId = wordId;
        this.wordName = wordName;
        this.wordMean = wordMean;
        this.createdAt = createdAt;
    }

    public static WordDto from(Word e) {
        return new WordDto(e.getWordId(), e.getWordName(), e.getWordMean(), e.getCreatedAt());
    }

    @Override
    public String toString() {
        return "WordDto{" +
                "wordId=" + wordId +
                ", wordName='" + wordName + '\'' +
                ", wordMean='" + wordMean + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
