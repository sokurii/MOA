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
public class ForeignerKey implements Serializable {
    private Long foreignerId;

    @OneToOne
    private NationCode foreignerCode;

    @Builder
    public ForeignerKey(long foreignerId, NationCode foreignerCode) {
        this.foreignerId = foreignerId;
        this.foreignerCode = foreignerCode;
    }
}
