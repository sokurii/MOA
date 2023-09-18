package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.*;
import com.ssafy.moa.api.entity.BalanceGame;
import com.ssafy.moa.api.entity.BalanceGameGood;
import com.ssafy.moa.api.entity.BalanceGameList;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.repository.BalanceGameGoodRepository;
import com.ssafy.moa.api.repository.BalanceGameListRepository;
import com.ssafy.moa.api.repository.BalanceGameRepository;
import com.ssafy.moa.api.repository.MemberRepository;
import com.ssafy.moa.api.service.BalanceGameService;
import com.ssafy.moa.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class BalanceGameServiceImpl implements BalanceGameService {

    private final MemberRepository memberRepository;
    private final BalanceGameRepository balanceGameRepository;
    private final BalanceGameListRepository balanceGameListRepository;
    private final BalanceGameGoodRepository balanceGameGoodRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long createBalanceGame(Long memberId, BalanceGameReqDto balanceGameReqDto) {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new NotFoundException("Not Found Member"));

        BalanceGame balanceGame = BalanceGame.builder()
                .balanceGameTitle(balanceGameReqDto.getBalanceGameTitle())
                .balanceGameTime(balanceGameReqDto.getBalanceGameTime())
                .member(member)
                .build();

        for (BalanceGameListReqDto balanceGameListReqDto : balanceGameReqDto.getBalanceGameList()){
            BalanceGameList balanceGameList = BalanceGameList.builder()
                    .balanceGameOne(balanceGameListReqDto.getBalanceGameOne())
                    .balanceGameTwo(balanceGameListReqDto.getBalanceGameTwo())
                    .balanceOrder(balanceGameListReqDto.getBalanceOrder())
                    .balanceGame(balanceGame)
                    .build();
            balanceGameListRepository.save(balanceGameList);
        }

        return balanceGameRepository.save(balanceGame).getBalanceGameId();
    }

    @Override
    public List<BalanceGameResDto> getAllBalanceGame() {
        List<BalanceGame> balanceGameList = balanceGameRepository.findAllByOrderByCreatedAtDesc().orElseThrow(() -> new NotFoundException("Not Found Balance Game"));
        List<BalanceGameResDto> result = new ArrayList<>();
        balanceGameList.forEach(e -> {
            result.add(BalanceGameResDto.from(e));
        });
        return result;
    }

    @Override
    public BalanceGameDto getBalanceGame(Long balanceGameId) {
        return balanceGameRepository.findBalanceGame(balanceGameId).orElseThrow(() -> new NotFoundException("Not Found Balance Game Detail"));
    }

    @Override
    @Transactional
    public Long deleteBalanceGame(Long balanceGameId) {
        return balanceGameRepository.deleteByBalanceGameId(balanceGameId);
    }

    @Override
    @Transactional
    public Long updateBalanceGame(BalanceGameDto balanceGameDto) {
        Optional<BalanceGame> balanceGameOptional = balanceGameRepository.findById(balanceGameDto.getBalanceGameId());
        
        // BalanceGame 테이블 수정
        BalanceGame balanceGame = balanceGameOptional.orElseThrow(() -> new NotFoundException("Not Found Balance Game"));
        log.info(String.valueOf(balanceGame));
        balanceGame.change(balanceGameDto);
        
        // BalanceGameList 테이블 수정
        List<BalanceGameList> balanceGameList = balanceGame.getBalanceGameList();
        for(int i=0; i<balanceGameList.size(); i++){
            BalanceGameList balanceGameListItem = balanceGameList.get(i);
            balanceGameListItem.change(balanceGameDto.getBalanceGameList().get(i));
        }
        
        return balanceGame.getBalanceGameId();
    }

    @Override
    @Transactional
    public Long createBalanceGameReaction(Long memberId, BalanceGameReactionDto balanceGameReactionDto) {
        Optional<BalanceGame> balanceGameOptional = balanceGameRepository.findById(balanceGameReactionDto.getBalanceGameId());

        // BalanceGame 테이블 수정
        BalanceGame balanceGame = balanceGameOptional.orElseThrow(() -> new NotFoundException("Not Found Balance Game"));
        if (balanceGameReactionDto.getReactionId() == 01){
            balanceGame.plusGood();
        } else if (balanceGameReactionDto.getReactionId() == 02) {
            balanceGame.plusNormal();
        }
        else if (balanceGameReactionDto.getReactionId() == 03) {
            balanceGame.plusBad();
        }

        // BalanceGameGood 테이블 수정
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new NotFoundException("Not Found Member"));
        BalanceGameGood balanceGameGood = BalanceGameGood.builder()
                .balanceGameReaction(balanceGameReactionDto.getReactionId())
                .balanceGame(balanceGame)
                .member(member)
                .build();
        balanceGameGoodRepository.save(balanceGameGood);

        return balanceGame.getBalanceGameId();
    }

    @Override
    public List<BalanceGameResDto> getBestBalanceGame() {
        List<BalanceGame> balanceGameList = balanceGameRepository.findTop3ByOrderByGoodCountDescNormalCountDescBadCountDesc().orElseThrow(() -> new NotFoundException("Not Found Balance Game"));
        List<BalanceGameResDto> result = new ArrayList<>();
        balanceGameList.forEach(e -> {
            result.add(BalanceGameResDto.from(e));
        });
        return result;
    }
}
