package com.ssafy.moa.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BalanceGameListReqDto {
    private String balanceGameOne;
    private String balanceGameTwo;
    private Integer balanceOrder;

    @Builder
    public BalanceGameListReqDto(String balanceGameOne, String balanceGameTwo, Integer balanceOrder) {
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
