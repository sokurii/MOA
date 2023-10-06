package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "interest")
public class Interest {

    @Id
    @Column(name = "interest_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long interestId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "interest_code", referencedColumnName = "interest_code")
    private InterestCode interestCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    private Member member;

    @Builder
    public Interest(Long interestId, InterestCode interestCode, Member member) {
        this.interestId = interestId;
        this.interestCode = interestCode;
        this.member = member;
    }

    @Override
    public String toString() {
        return "Interest{" +
                "interestId=" + interestId +
                ", interestCode=" + interestCode +
                ", member=" + member +
                '}';
    }
}
