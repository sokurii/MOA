package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Korean {

    @Id
    @Column(name = "korean_id")
    private Long koreanId;
    private int koreanLikeGender;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "member_id", insertable = false, updatable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "nation_code", referencedColumnName = "nation_code", insertable = false, updatable = false)
    private NationCode nationCode;

    @OneToOne
    @JoinColumn(name = "buddy_id")
    private Buddy buddy;

    @Builder
    public Korean(Long koreanId, int koreanLikeGender, Member member, NationCode nationCode) {
        this.koreanId = koreanId;
        this.koreanLikeGender = koreanLikeGender;
        this.member = member;
        this.nationCode = nationCode;
    }
}
