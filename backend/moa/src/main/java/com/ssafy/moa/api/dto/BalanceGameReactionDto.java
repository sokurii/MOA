package com.ssafy.moa.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class BalanceGameReactionDto {
    private Long balanceGameId;
    private Integer reactionId;

    @Builder
    public BalanceGameReactionDto(Long balanceGameId, Integer reactionId) {
        this.balanceGameId = balanceGameId;
        this.reactionId = reactionId;
    }
}
