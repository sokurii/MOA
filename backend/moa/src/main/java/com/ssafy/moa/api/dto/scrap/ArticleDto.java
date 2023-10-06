package com.ssafy.moa.api.dto.scrap;

import com.ssafy.moa.api.entity.Article;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ArticleDto {
    private Long articleId;
    private Long articleOriginId;
    private String articleTitle;
    private String articleContent;
    private String articleLink;
    private LocalDateTime createdAt;

    @Builder
    public ArticleDto(Long articleId, Long articleOriginId, String articleTitle, String articleContent, String articleLink, LocalDateTime createdAt) {
        this.articleId = articleId;
        this.articleOriginId = articleOriginId;
        this.articleTitle = articleTitle;
        this.articleContent = articleContent;
        this.articleLink = articleLink;
        this.createdAt = createdAt;
    }


    public static ArticleDto from(Article e) {
        return new ArticleDto(e.getArticleId(), e.getArticleOriginId(), e.getArticleTitle(), e.getArticleContent(), e.getArticleLink(), e.getCreatedAt());
    }

    @Override
    public String toString() {
        return "ArticleDto{" +
                "articleId=" + articleId +
                ", articleOriginId=" + articleOriginId +
                ", articleTitle='" + articleTitle + '\'' +
                ", articleContent='" + articleContent + '\'' +
                ", articleLink='" + articleLink + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}
