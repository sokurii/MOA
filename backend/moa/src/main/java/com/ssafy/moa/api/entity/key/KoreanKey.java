package com.ssafy.moa.api.entity.key;

import com.ssafy.moa.api.entity.NationCode;
import jakarta.persistence.Embeddable;
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
public class KoreanKey implements Serializable {
    private Long koreanId;

    @OneToOne
    private NationCode koreanNationCode;

    @Builder
    public KoreanKey(long koreanId, NationCode koreanNationCode) {
        this.koreanId = koreanId;
        this.koreanNationCode = koreanNationCode;
    }

    @Override
    public String toString() {
        return "KoreanKey{" +
                "koreanId=" + koreanId +
                ", koreanNationCode=" + koreanNationCode +
                '}';
    }
}
