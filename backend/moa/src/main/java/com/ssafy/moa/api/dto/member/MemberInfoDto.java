package com.ssafy.moa.api.dto.member;

import lombok.Builder;
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
    private Integer memberLevelGrade;
    private Integer memberExp;
    private Integer memberRequiredExp;

    @Builder
    public MemberInfoDto(Boolean memberIsForeigner, String memberName, String memberKoreaName, String memberImgAddress, String memberNationName,
                         Long memberLevelId, String memberLevelName, Integer memberLevelGrade, Integer memberExp, Integer memberRequiredExp) {
        this.memberIsForeigner = memberIsForeigner;
        this.memberName = memberName;
        this.memberKoreaName = memberKoreaName;
        this.memberImgAddress = memberImgAddress;
        this.memberNationName = memberNationName;
        this.memberLevelId = memberLevelId;
        this.memberLevelName = memberLevelName;
        this.memberLevelGrade = memberLevelGrade;
        this.memberExp = memberExp;
        this.memberRequiredExp = memberRequiredExp;
    }

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
