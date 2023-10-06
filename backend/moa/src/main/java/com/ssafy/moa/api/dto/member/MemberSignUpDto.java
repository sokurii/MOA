package com.ssafy.moa.api.dto.member;

import com.ssafy.moa.api.entity.Member;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
public class MemberSignUpDto {

    @Email
    private String memberEmail;

    @Pattern(regexp = "^(?=.*[a-z])(?=.*[0-9])(?=.*\\W)(?=\\S+$).{8,16}$", message = "비밀번호는 8~16자 영문 소문자, 숫자, 특수문자를 사용하세요.")
    private String memberPassword;
    private String memberName;
    private Integer memberGender;
    private Boolean memberIsForeigner;
    private String nationName; // 외국인 유학생일 경우 국가 이름 필요

    @Builder
    public MemberSignUpDto(Member member) {
        this.memberEmail = member.getMemberEmail();
        this.memberPassword = member.getMemberPassword();
        this.memberName = member.getMemberName();
        this.memberGender = member.getMemberGender();
        this.memberIsForeigner = member.getMemberIsForeigner();
    }

}
