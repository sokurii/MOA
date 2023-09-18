package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "balance_game_good")
public class BalanceGameGood {
    @Id
    @Column(name = "balance_game_like_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long balanceGameLikeId;

    @Column(name = "balance_game_reaction")
    private Integer balanceGameReaction;

    @ManyToOne
    @JoinColumn(name = "balance_game_id", referencedColumnName = "balance_game_id")
    private BalanceGame balanceGame;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    private Member member;

    @Builder

    public BalanceGameGood(Long balanceGameLikeId, Integer balanceGameReaction, BalanceGame balanceGame, Member member) {
        this.balanceGameLikeId = balanceGameLikeId;
        this.balanceGameReaction = balanceGameReaction;
        this.balanceGame = balanceGame;
        this.member = member;
    }
}
