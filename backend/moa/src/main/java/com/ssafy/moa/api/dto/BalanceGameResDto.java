package com.ssafy.moa.api.dto;

import com.ssafy.moa.api.entity.BalanceGame;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BalanceGameResDto {
    private Long balanceGameId;
    private String balanceGameTitle;

    @Builder
    public BalanceGameResDto(Long balanceGameId, String balanceGameTitle) {
        this.balanceGameId = balanceGameId;
        this.balanceGameTitle = balanceGameTitle;
    }

    public static BalanceGameResDto from(BalanceGame bg){
        return new BalanceGameResDto(bg.getBalanceGameId(), bg.getBalanceGameTitle());
    }

    @Override
    public String toString() {
        return "BalanceGameResDto{" +
                "balanceGameId=" + balanceGameId +
                ", balanceGameTitle='" + balanceGameTitle + '\'' +
                '}';
    }
}
