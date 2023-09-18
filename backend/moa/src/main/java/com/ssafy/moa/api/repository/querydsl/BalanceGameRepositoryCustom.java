package com.ssafy.moa.api.repository.querydsl;

import com.ssafy.moa.api.dto.BalanceGameDto;

import java.util.Optional;

public interface BalanceGameRepositoryCustom {
    Optional<BalanceGameDto> findBalanceGame(Long balanceGameId);
}
