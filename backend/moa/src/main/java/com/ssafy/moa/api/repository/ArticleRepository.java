package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByMember_MemberIdOrderByCreatedAtDesc(Long memberId);
    Long deleteByArticleId(Long articleId);
}
