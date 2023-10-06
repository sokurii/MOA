package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.dto.BalanceGameDto;
import com.ssafy.moa.api.entity.BalanceGame;
import com.ssafy.moa.api.repository.querydsl.BalanceGameRepositoryCustom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BalanceGameRepository extends JpaRepository<BalanceGame, Long>, BalanceGameRepositoryCustom {
    Optional<List<BalanceGame>> findAllByOrderByCreatedAtDesc();
    Long deleteByBalanceGameId(Long balanceGameId);
    Optional<List<BalanceGame>> findTop3ByOrderByGoodCountDescNormalCountDescBadCountDesc();
}
