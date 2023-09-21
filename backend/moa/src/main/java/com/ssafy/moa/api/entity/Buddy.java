package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor
public class Buddy {

    @Id
    @Column(name = "buddy_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buddyId;

    @OneToOne
    @JoinColumn(name = "foreigner_id")
    private Foreigner foreigner;

    @OneToOne
    @JoinColumn(name = "korean_id")
    private Korean korean;

    private LocalDate createdAt;

    @Builder
    public Buddy(Long buddyId, Foreigner foreigner, Korean korean, LocalDate createdAt) {
        this.buddyId = buddyId;
        this.foreigner = foreigner;
        this.korean = korean;
        this.createdAt = createdAt;
    }
}
