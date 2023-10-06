package com.ssafy.moa.api.dto.member;

import com.ssafy.moa.api.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberDto {

    private Long memberId;
    private String memberName;
    private String memberEmail;
    private Boolean memberIsForeigner;

    @Builder
    public MemberDto(Member member) {
        this.memberId = member.getMemberId();
        this.memberEmail = member.getMemberEmail();
        this.memberName = member.getMemberName();
        this.memberIsForeigner = member.getMemberIsForeigner();
    }
}
