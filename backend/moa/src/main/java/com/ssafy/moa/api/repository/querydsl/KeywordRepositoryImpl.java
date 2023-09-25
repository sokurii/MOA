package com.ssafy.moa.api.repository.querydsl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.moa.api.dto.BalanceGameDto;
import com.ssafy.moa.api.dto.BalanceGameListDto;
import com.ssafy.moa.api.dto.KeywordDto;
import com.ssafy.moa.api.dto.KeywordReqDto;
import com.ssafy.moa.api.entity.QKeyword;
import lombok.RequiredArgsConstructor;

import java.util.List;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;

@RequiredArgsConstructor
public class KeywordRepositoryImpl implements KeywordRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public List<KeywordReqDto> getBestKeyword() {
        QKeyword keyword = QKeyword.keyword;

        List<KeywordReqDto> keywordList = queryFactory
                .select(keyword.keywordName)
                .from(keyword)
                .groupBy(keyword.keywordName)
                .orderBy(keyword.count().desc())
                .limit(3)
                .transform(groupBy(keyword.keywordName).list(Projections.constructor(KeywordReqDto.class,
                        keyword.keywordName)));
        return keywordList;
    }
}
