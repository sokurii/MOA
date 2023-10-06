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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long koreanId;
    private int koreanLikeGender;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_code", referencedColumnName = "nation_code")
    private NationCode nationCode;

    @OneToOne(mappedBy = "korean")
    private Buddy buddy;

    @Builder
    public Korean(Long koreanId, int koreanLikeGender, Member member, NationCode nationCode) {
        this.koreanId = koreanId;
        this.koreanLikeGender = koreanLikeGender;
        this.member = member;
        this.nationCode = nationCode;
    }

    @Override
    public String toString() {
        return "Korean{" +
                "koreanId=" + koreanId +
                ", koreanLikeGender=" + koreanLikeGender +
                ", member=" + member +
                ", nationCode=" + nationCode +
                ", buddy=" + buddy +
                '}';
    }
}
