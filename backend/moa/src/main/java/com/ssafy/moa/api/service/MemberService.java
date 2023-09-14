package com.ssafy.moa.api.service;

import com.ssafy.moa.dto.LoginReqDto;
import com.ssafy.moa.dto.MemberSignUpDto;
import com.ssafy.moa.dto.TokenRespDto;
import org.springframework.security.core.Authentication;

public interface MemberService {

    MemberSignUpDto signUp(MemberSignUpDto memberSignUpDto);
    TokenRespDto login(LoginReqDto loginReqDto);
    void logout(Authentication authentication);

}
