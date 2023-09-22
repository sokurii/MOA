package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class ExchangeDiary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long exchangeDiaryId;
    private String exchangeDiaryContent;
    @Column(name = "exchange_diary_date")
    private LocalDateTime exchangeDiaryDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String exchangeDiaryPicture;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    private Member member;

    @Builder
    public ExchangeDiary(String exchangeDiaryContent, LocalDateTime exchangeDiaryDate, LocalDateTime createdAt, LocalDateTime updatedAt, String exchangeDiaryPicture, Member member) {
        this.exchangeDiaryContent = exchangeDiaryContent;
        this.exchangeDiaryDate = exchangeDiaryDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.exchangeDiaryPicture = exchangeDiaryPicture;
        this.member = member;
    }

    public void update(String exchangeDiaryContent) {
        this.exchangeDiaryContent = exchangeDiaryContent;
    }
}
