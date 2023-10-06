package com.ssafy.moa.api.dto.member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberPhotoDto {

    private String memberImgAddress;

    @Builder
    public MemberPhotoDto(String memberImgAddress) {
        this.memberImgAddress = memberImgAddress;
    }
}
