package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.BalanceGameDto;

public interface BalanceGameService {
    Long createBalanceGame(Long memberId, BalanceGameDto balanceGameDto);
}
