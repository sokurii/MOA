package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "ariticle")
public class Article {
    @Id
    @Column(name = "article_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleId;

    @NotNull
    @Column(name = "article_origin_id")
    private Long articleOriginId;

    @NotNull
    @Column(name = "article_title")
    private String articleTitle;

    @NotNull
    @Column(name = "article_content", length = 1000)
    private String articleContent;

    @NotNull
    @Column(name = "article_link")
    private String articleLink;

    @NotNull
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    private Member member;

    @Builder
    public Article(Long articleId, @NotNull Long articleOriginId, @NotNull String articleTitle, @NotNull String articleContent, @NotNull String articleLink, @NotNull LocalDateTime createdAt, Member member) {
        this.articleId = articleId;
        this.articleOriginId = articleOriginId;
        this.articleTitle = articleTitle;
        this.articleContent = articleContent;
        this.articleLink = articleLink;
        this.createdAt = LocalDateTime.now();
        this.member = member;
    }


    @Override
    public String toString() {
        return "Article{" +
                "articleId=" + articleId +
                ", articleTitle='" + articleTitle + '\'' +
                ", articleContent='" + articleContent + '\'' +
                ", articleLink='" + articleLink + '\'' +
                ", member=" + member +
                '}';
    }
}
