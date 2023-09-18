package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.BalanceGameDto;
import com.ssafy.moa.api.dto.BalanceGameReactionDto;
import com.ssafy.moa.api.dto.BalanceGameReqDto;
import com.ssafy.moa.api.dto.BalanceGameResDto;

import java.util.List;

public interface BalanceGameService {
    Long createBalanceGame(Long memberId, BalanceGameReqDto balanceGameReqDto);

    List<BalanceGameResDto> getAllBalanceGame();

    BalanceGameDto getBalanceGame(Long balanceGameId);

    Long deleteBalanceGame(Long balanceGameId);

    Long updateBalanceGame(BalanceGameDto balanceGameDto);

    Long createBalanceGameReaction(Long memberId, BalanceGameReactionDto balanceGameReactionDto);

    List<BalanceGameResDto> getBestBalanceGame();
}
