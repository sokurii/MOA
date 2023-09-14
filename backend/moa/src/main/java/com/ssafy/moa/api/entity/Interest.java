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
    private Long interestId;

    @ManyToOne
    @JoinColumn(name = "interest_code", referencedColumnName = "interest_code", insertable = false, updatable = false)
    private InterestCode interestCode;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "member_id", insertable = false, updatable = false)
    private Member member;

    @Builder
    public Interest(Long interestId, InterestCode interestCode, Member member) {
        this.interestId = interestId;
        this.interestCode = interestCode;
        this.member = member;
    }
}
