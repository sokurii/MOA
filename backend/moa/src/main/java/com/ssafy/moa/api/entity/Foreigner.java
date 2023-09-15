package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Entity
@Getter
@NoArgsConstructor
public class Foreigner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "foreigner_id")
    private Long foreignerId;

    @Column(length = 100)
    private String foreignerKoreaName;
    private int foreignerLikeGender;

    @OneToOne
    @JoinColumn(name = "member_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nation_code", referencedColumnName = "nation_code")
    private NationCode nationCode;

    @OneToOne(mappedBy = "foreigner")
    private Buddy buddy;

    public void update(int foreignerLikeGender) {
        this.foreignerLikeGender = foreignerLikeGender;
    }

    //회원가입 시 사용할 Foreigner Builder
    public Foreigner(Member member, NationCode nationCode) {
        this.member = member;
        this.nationCode = nationCode;
    }

}
