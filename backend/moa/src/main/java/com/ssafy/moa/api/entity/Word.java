package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "word")
public class Word {
    @Id
    @Column(name = "word_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long wordId;

    @NotNull
    @Column(name = "word_name")
    private String wordName;

    @NotNull
    @Column(name = "word_mean")
    private String wordMean;

    @NotNull
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    private Member member;

    @Builder
    public Word(Long wordId, @NotNull String wordName, @NotNull String wordMean, @NotNull LocalDateTime createdAt, Member member) {
        this.wordId = wordId;
        this.wordName = wordName;
        this.wordMean = wordMean;
        this.createdAt = LocalDateTime.now();
        this.member = member;
    }

    @Override
    public String toString() {
        return "Word{" +
                "wordId=" + wordId +
                ", wordName='" + wordName + '\'' +
                ", wordMean='" + wordMean + '\'' +
                ", createdAt=" + createdAt +
                ", member=" + member +
                '}';
    }
}
