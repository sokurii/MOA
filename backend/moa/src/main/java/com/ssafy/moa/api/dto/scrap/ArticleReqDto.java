package com.ssafy.moa.api.dto.scrap;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ArticleReqDto {
    private Long articleOriginId;
    private String articleTitle;
    private String articleContent;
    private String articleLink;

    @Builder
    public ArticleReqDto(Long articleOriginId, String articleTitle, String articleContent, String articleLink) {
        this.articleOriginId = articleOriginId;
        this.articleTitle = articleTitle;
        this.articleContent = articleContent;
        this.articleLink = articleLink;
    }

    @Override
    public String toString() {
        return "ArticleReqDto{" +
                "articleOriginId=" + articleOriginId +
                ", articleTitle='" + articleTitle + '\'' +
                ", articleContent='" + articleContent + '\'' +
                ", articleLink='" + articleLink + '\'' +
                '}';
    }
}
