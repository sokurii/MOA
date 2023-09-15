package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Foreigner {

    @Id
    @Column(name = "foreigner_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long foreignerId;

    @Column(length = 100)
    private String foreignerKoreaName;
    private int foreignerLikeGender;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_code", referencedColumnName = "nation_code")
    private NationCode nationCode;

    @OneToOne(mappedBy = "foreigner")
    private Buddy buddy;

    public void update(int foreignerLikeGender) {
        this.foreignerLikeGender = foreignerLikeGender;
    }

}
