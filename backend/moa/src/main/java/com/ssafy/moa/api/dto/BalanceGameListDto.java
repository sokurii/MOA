package com.ssafy.moa.api.dto;

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

    @Override
    public String toString() {
        return "BalanceGameListDto{" +
                "balanceGameOne='" + balanceGameOne + '\'' +
                ", balanceGameTwo='" + balanceGameTwo + '\'' +
                ", balanceOrder=" + balanceOrder +
                '}';
    }
}
