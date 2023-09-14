package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.BalanceGame;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BalanceGameRepository extends JpaRepository<BalanceGame, Long> {
}
