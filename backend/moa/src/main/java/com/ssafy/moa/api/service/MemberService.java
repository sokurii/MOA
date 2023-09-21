package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.member.LoginReqDto;
import com.ssafy.moa.api.dto.member.MemberInfoDto;
import com.ssafy.moa.api.dto.member.MemberSignUpDto;
import com.ssafy.moa.api.dto.member.TokenRespDto;
import com.ssafy.moa.api.entity.Member;
import org.springframework.security.core.Authentication;

public interface MemberService {

    MemberSignUpDto signUp(MemberSignUpDto memberSignUpDto);
    TokenRespDto login(LoginReqDto loginReqDto);
    void logout(Authentication authentication);
    String removeMember(Long memberId);
    Member findMember(Long memberId);

//    MemberInfoDto getMemberInfo(Long memberId);
}
