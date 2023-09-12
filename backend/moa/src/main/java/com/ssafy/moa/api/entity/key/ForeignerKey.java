package com.ssafy.moa.api.entity.key;

import com.ssafy.moa.api.entity.NationCode;
import jakarta.persistence.Embeddable;
import jakarta.persistence.OneToOne;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@Embeddable
@NoArgsConstructor
@EqualsAndHashCode
public class ForeignerKey implements Serializable {
    private int foreignerId;

    @OneToOne
    private NationCode foreignerCode;
}
