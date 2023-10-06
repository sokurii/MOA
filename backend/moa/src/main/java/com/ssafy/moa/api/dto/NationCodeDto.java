package com.ssafy.moa.api.dto;

import com.ssafy.moa.api.entity.NationCode;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class NationCodeDto {

    private int nationCode;
    private String nationName;

    @Builder
    public NationCodeDto(NationCode nationCode) {
        this.nationCode = nationCode.getNationCode();
        this.nationName = nationCode.getNationName();
    }


}
