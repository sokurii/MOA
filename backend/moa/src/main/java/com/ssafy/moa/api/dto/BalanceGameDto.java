package com.ssafy.moa.api.dto;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class BalanceGameDto {
    private Long balanceGameId;
    private String balanceGameTitle;
    private Integer balanceGameTime;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Integer goodCount;
    private Integer normalCount;
    private Integer badCount;
    private List<BalanceGameListDto> balanceGameList;

    @Builder
    public BalanceGameDto(Long balanceGameId, String balanceGameTitle, Integer balanceGameTime, Integer goodCount, Integer normalCount, Integer badCount, List<BalanceGameListDto> balanceGameList) {
        this.balanceGameId = balanceGameId;
        this.balanceGameTitle = balanceGameTitle;
        this.balanceGameTime = balanceGameTime;
        this.goodCount = goodCount;
        this.normalCount = normalCount;
        this.badCount = badCount;
        this.balanceGameList = balanceGameList;
    }

    @Builder
    public BalanceGameDto(Long balanceGameId, String balanceGameTitle, Integer balanceGameTime, LocalDateTime createdAt, LocalDateTime updatedAt, Integer goodCount, Integer normalCount, Integer badCount, List<BalanceGameListDto> balanceGameList) {
        this.balanceGameId = balanceGameId;
        this.balanceGameTitle = balanceGameTitle;
        this.balanceGameTime = balanceGameTime;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.goodCount = goodCount;
        this.normalCount = normalCount;
        this.badCount = badCount;
        this.balanceGameList = balanceGameList;
    }

    @Override
    public String toString() {
        return "BalanceGameDto{" +
                "balanceGameId=" + balanceGameId +
                ", balanceGameTitle='" + balanceGameTitle + '\'' +
                ", balanceGameTime=" + balanceGameTime +
                ", balanceGameList=" + balanceGameList +
                '}';
    }
}
