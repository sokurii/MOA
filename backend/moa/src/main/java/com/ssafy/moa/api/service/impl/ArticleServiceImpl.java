package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.scrap.ArticleDto;
import com.ssafy.moa.api.dto.scrap.ArticleReqDto;
import com.ssafy.moa.api.entity.Article;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.repository.ArticleRepository;
import com.ssafy.moa.api.repository.MemberRepository;
import com.ssafy.moa.api.service.ArticleService;
import com.ssafy.moa.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ArticleServiceImpl implements ArticleService {

    private final MemberRepository memberRepository;
    private final ArticleRepository articleRepository;

    @Override
    @Transactional
    public Long createArticleScrap(Long memberId, ArticleReqDto articleReqDto) {
        Member member = memberRepository.findByMemberId(memberId).orElseThrow(() -> new NotFoundException("Not Found Member"));

        Article article = Article.builder()
                .articleTitle(articleReqDto.getArticleTitle())
                .articleContent(articleReqDto.getArticleContent())
                .articleLink(articleReqDto.getArticleLink())
                .member(member)
                .build();

        return articleRepository.save(article).getArticleId();
    }

    @Override
    public List<ArticleDto> getAllArticleScrap(Long memberId) {
        List<Article> articleList = articleRepository.findByMember_MemberIdOrderByCreatedAtDesc(memberId);
        List<ArticleDto> result = new ArrayList<>();
        articleList.forEach(e -> {
            result.add(ArticleDto.from(e));
        });
        return result;
    }

    @Override
    public ArticleDto getArticle(Long articleId) {
        Article article = articleRepository.findById(articleId).orElseThrow(() -> new NotFoundException("Not Found Article Detail"));
        return ArticleDto.from(article);
    }

    @Override
    @Transactional
    public Long deleteArticle(Long articleId) {
        return articleRepository.deleteByArticleId(articleId);
    }
}
