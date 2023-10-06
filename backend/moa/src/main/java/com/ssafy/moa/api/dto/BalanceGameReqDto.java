package com.ssafy.moa.api.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BalanceGameReqDto {
    private String balanceGameTitle;
    private Integer balanceGameTime;
    private List<BalanceGameListReqDto> balanceGameList;

    @Override
    public String toString() {
        return "BalanceGameDto{" +
                "balanceGameTitle='" + balanceGameTitle + '\'' +
                ", balanceGameTime=" + balanceGameTime +
                ", balanceGameList=" + balanceGameList +
                '}';
    }
}
