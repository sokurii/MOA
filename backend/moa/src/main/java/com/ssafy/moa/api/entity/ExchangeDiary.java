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
    private String exchangeDiaryTitle;
    private String exchangeDiaryContent;
    private LocalDateTime exchangeDiaryDate;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String exchangeDiaryPicture;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    private Member member;

    @Builder
    public ExchangeDiary(String exchangeDiaryTitle, String exchangeDiaryContent, LocalDateTime exchangeDiaryDate, LocalDateTime createdAt, LocalDateTime updatedAt, String exchangeDiaryPicture, Member member) {
        this.exchangeDiaryTitle = exchangeDiaryTitle;
        this.exchangeDiaryContent = exchangeDiaryContent;
        this.exchangeDiaryDate = exchangeDiaryDate;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.exchangeDiaryPicture = exchangeDiaryPicture;
        this.member = member;
    }

    public void update(String exchangeDiaryTitle, String exchangeDiaryContent) {
        this.exchangeDiaryTitle = exchangeDiaryTitle;
        this.exchangeDiaryContent = exchangeDiaryContent;
    }
}
