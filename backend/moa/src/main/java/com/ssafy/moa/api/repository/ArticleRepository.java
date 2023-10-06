package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ArticleRepository extends JpaRepository<Article, Long> {
    List<Article> findByMember_MemberIdOrderByCreatedAtDesc(Long memberId);
    Long deleteByArticleId(Long articleId);
    Long deleteByMember_MemberIdAndArticleOriginId(Long memberId, Long articleId);
    List<Article> findByMember_MemberIdAndAndArticleOriginId(Long memberId, Long articleOriginId);
}
