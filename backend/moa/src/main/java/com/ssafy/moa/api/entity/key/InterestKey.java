package com.ssafy.moa.api.entity.key;

import com.ssafy.moa.api.entity.InterestCode;
import com.ssafy.moa.api.entity.Member;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@Embeddable
@NoArgsConstructor
@EqualsAndHashCode
public class InterestKey implements Serializable {

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "member_id", insertable = false, updatable = false)
    private Member memberId;
    @OneToOne
    private InterestCode interestCode;

    @Builder
    public InterestKey(Member memberId, InterestCode interestCode) {
        this.memberId = memberId;
        this.interestCode = interestCode;
    }
}
