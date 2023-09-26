package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.scrap.ArticleDto;
import com.ssafy.moa.api.dto.scrap.ArticleReqDto;

import java.util.List;

public interface ArticleService {
    Long createArticleScrap(Long memberId, ArticleReqDto articleReqDto);

    List<ArticleDto> getAllArticleScrap(Long memberId);

    ArticleDto getArticle(Long articleId);

    Long deleteArticle(Long articleId);

    Long checkArticle(Long memberId, Long articleOriginId);
}
