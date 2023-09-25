package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.dto.KeywordDto;
import com.ssafy.moa.api.entity.Keyword;
import com.ssafy.moa.api.repository.querydsl.KeywordRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface KeywordRepository extends JpaRepository<Keyword, Long>, KeywordRepositoryCustom {
    List<Keyword> findByMember_MemberId(Long memberId);
    Long deleteByKeywordId(Long keywordId);
}
