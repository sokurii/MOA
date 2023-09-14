package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.BalanceGameDto;
import com.ssafy.moa.api.dto.BalanceGameListDto;
import com.ssafy.moa.api.entity.BalanceGame;
import com.ssafy.moa.api.entity.BalanceGameList;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.repository.BalanceGameListRepository;
import com.ssafy.moa.api.repository.BalanceGameRepository;
import com.ssafy.moa.api.repository.MemberRepository;
import com.ssafy.moa.api.service.BalanceGameService;
import com.ssafy.moa.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BalanceGameServiceImpl implements BalanceGameService {

    private final MemberRepository memberRepository;
    private final BalanceGameRepository balanceGameRepository;
    private final BalanceGameListRepository balanceGameListRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long createBalanceGame(Long memberId, BalanceGameDto balanceGameDto) {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new NotFoundException("Not Found Member"));

        BalanceGame balanceGame = BalanceGame.builder()
                .balanceGameTitle(balanceGameDto.getBalanceGameTitle())
                .balanceGameTime(balanceGameDto.getBalanceGameTime())
                .member(member)
                .build();

        for (BalanceGameListDto balanceGameListDto : balanceGameDto.getBalanceGameList()){
            BalanceGameList balanceGameList = BalanceGameList.builder()
                    .balanceGameOne(balanceGameListDto.getBalanceGameOne())
                    .balanceGameTwo(balanceGameListDto.getBalanceGameTwo())
                    .balanceOrder(balanceGameListDto.getBalanceOrder())
                    .balanceGame(balanceGame)
                    .build();
            balanceGameListRepository.save(balanceGameList);
        }

        return balanceGameRepository.save(balanceGame).getBalanceGameId();
    }
}
