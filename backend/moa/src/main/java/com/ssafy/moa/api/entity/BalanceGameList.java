package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "balance_game_list")
public class BalanceGameList {
    @Id
    @Column(name = "balance_game_list_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long balanceGameListId;

    @NotNull
    @Column(name = "balance_game_one")
    private String balanceGameOne;

    @NotNull
    @Column(name = "balance_game_two")
    private String balanceGameTwo;

    @NotNull
    @Column(name = "balance_order")
    private Integer balanceOrder;

    @ManyToOne
    @JoinColumn(name = "balance_game_id", referencedColumnName = "balance_game_id")
    private BalanceGame balanceGame;

    @Builder
    public BalanceGameList(Long balanceGameListId, @NotNull String balanceGameOne, @NotNull String balanceGameTwo, @NotNull Integer balanceOrder, BalanceGame balanceGame) {
        this.balanceGameListId = balanceGameListId;
        this.balanceGameOne = balanceGameOne;
        this.balanceGameTwo = balanceGameTwo;
        this.balanceOrder = balanceOrder;
        this.balanceGame = balanceGame;
    }
}
