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
    private Long foreignerId;

    @Column(length = 100)
    private String foreignerKoreaName;
    private int foreignerLikeGender;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "member_id", insertable = false, updatable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "nation_code", referencedColumnName = "nation_code", insertable = false, updatable = false)
    private NationCode nationCode;

    @OneToOne
    @JoinColumn(name = "buddy_id")
    private Buddy buddy;

    public void update(int foreignerLikeGender) {
        this.foreignerLikeGender = foreignerLikeGender;
    }

}
