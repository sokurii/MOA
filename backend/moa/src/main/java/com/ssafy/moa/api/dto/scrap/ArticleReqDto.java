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
    private String articleTitle;
    private String articleContent;
    private String articleLink;

    @Builder
    public ArticleReqDto(String articleTitle, String articleContent, String articleLink) {
        this.articleTitle = articleTitle;
        this.articleContent = articleContent;
        this.articleLink = articleLink;
    }

    @Override
    public String toString() {
        return "ArticleDto{" +
                "articleTitle='" + articleTitle + '\'' +
                ", articleContent='" + articleContent + '\'' +
                ", articleLink='" + articleLink + '\'' +
                '}';
    }
}
