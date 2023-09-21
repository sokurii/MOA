package com.ssafy.moa.api.dto.member;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberInfoDto {

    private Boolean memberIsForeigner;
    private String memberName;
    private String memberKoreaName;
    private String memberImgAddress;
    private String memberNationName;
    private Long memberLevelId;
    private String memberLevelName;
    private String memberLevelGrade;
    private Integer memberExp;
    private Integer memberRequiredExp;

    @Override
    public String toString() {
        return "MemberInfoDto{" +
                "memberIsForeigner=" + memberIsForeigner +
                ", memberName='" + memberName + '\'' +
                ", memberKoreaName='" + memberKoreaName + '\'' +
                ", memberImgAddress='" + memberImgAddress + '\'' +
                ", memberNationName='" + memberNationName + '\'' +
                ", memberLevelId=" + memberLevelId +
                ", memberLevelName='" + memberLevelName + '\'' +
                ", memberLevelGrade='" + memberLevelGrade + '\'' +
                ", memberExp=" + memberExp +
                ", memberRequiredExp=" + memberRequiredExp +
                '}';
    }
}
