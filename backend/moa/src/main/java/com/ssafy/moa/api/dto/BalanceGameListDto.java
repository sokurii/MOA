package com.ssafy.moa.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BalanceGameListDto {
    private String balanceGameOne;
    private String balanceGameTwo;
    private Integer balanceOrder;

    @Builder
    public BalanceGameListDto(String balanceGameOne, String balanceGameTwo, Integer balanceOrder) {
        this.balanceGameOne = balanceGameOne;
        this.balanceGameTwo = balanceGameTwo;
        this.balanceOrder = balanceOrder;
    }

    @Override
    public String toString() {
        return "BalanceGameListDto{" +
                "balanceGameOne='" + balanceGameOne + '\'' +
                ", balanceGameTwo='" + balanceGameTwo + '\'' +
                ", balanceOrder=" + balanceOrder +
                '}';
    }
}
