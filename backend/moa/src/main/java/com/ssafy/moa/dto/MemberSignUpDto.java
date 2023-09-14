package com.ssafy.moa.dto;

import com.ssafy.moa.api.entity.Member;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class MemberSignUpDto {

    private String memberEmail;
    private String memberPassword;
    private String memberName;
    private Integer memberGender;
    private Boolean memberIsForeigner;

    @Builder
    public MemberSignUpDto(Member member) {
        this.memberEmail = member.getMemberEmail();
        this.memberPassword = member.getMemberPassword();
        this.memberName = member.getMemberName();
        this.memberGender = member.getMemberGender();
        this.memberIsForeigner = member.getMemberIsForeigner();
    }

}
