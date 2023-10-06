package com.ssafy.moa.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BalanceGameListDto {
    private Long balanceGameListId;
    private String balanceGameOne;
    private String balanceGameTwo;
    private Integer balanceOrder;

    @Builder
    public BalanceGameListDto(Long balanceGameListId, String balanceGameOne, String balanceGameTwo, Integer balanceOrder) {
        this.balanceGameListId = balanceGameListId;
        this.balanceGameOne = balanceGameOne;
        this.balanceGameTwo = balanceGameTwo;
        this.balanceOrder = balanceOrder;
    }

    @Override
    public String toString() {
        return "BalanceGameListDto{" +
                "balanceGameListId=" + balanceGameListId +
                ", balanceGameOne='" + balanceGameOne + '\'' +
                ", balanceGameTwo='" + balanceGameTwo + '\'' +
                ", balanceOrder=" + balanceOrder +
                '}';
    }
}
