package com.ssafy.moa.api.repository.querydsl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.moa.api.dto.BalanceGameDto;
import com.ssafy.moa.api.dto.BalanceGameListDto;
import com.ssafy.moa.api.dto.BalanceGameListReqDto;
import com.ssafy.moa.api.entity.QBalanceGame;
import com.ssafy.moa.api.entity.QBalanceGameList;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.Optional;

import static com.querydsl.core.group.GroupBy.groupBy;
import static com.querydsl.core.group.GroupBy.list;

@RequiredArgsConstructor
public class BalanceGameRepositoryImpl implements BalanceGameRepositoryCustom{
    private final JPAQueryFactory queryFactory;

    @Override
    public Optional<BalanceGameDto> findBalanceGame(Long balanceGameId) {
        QBalanceGame bg = QBalanceGame.balanceGame;
        QBalanceGameList bgl = QBalanceGameList.balanceGameList;
        List<BalanceGameDto> balanceGame =queryFactory
                .from(bg)
                .leftJoin(bgl).on(bg.balanceGameId.eq(bgl.balanceGame.balanceGameId))
                .where(bg.balanceGameId.eq(balanceGameId))
                .transform(groupBy(bg.balanceGameId).list(Projections.constructor(BalanceGameDto.class,
                        bg.balanceGameId, bg.balanceGameTitle, bg.balanceGameTime, bg.goodCount, bg.normalCount, bg.badCount,
                        list(Projections.constructor(BalanceGameListDto.class,
                                bgl.balanceGameListId, bgl.balanceGameOne, bgl.balanceGameTwo, bgl.balanceOrder))
                        )));

        return Optional.ofNullable(balanceGame.get(0));
    }
}
