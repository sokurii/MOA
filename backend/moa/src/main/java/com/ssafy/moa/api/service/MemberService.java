package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.member.*;
import com.ssafy.moa.api.entity.Member;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface MemberService {

    MemberSignUpDto signUp(MemberSignUpDto memberSignUpDto);
    TokenRespDto login(LoginReqDto loginReqDto);
    void logout(Authentication authentication);
    String removeMember(Long memberId);
    Member findMember(Long memberId);

    MemberPhotoDto updateMemberPhoto(Long memberId, MultipartFile multipartFile) throws IOException;

    MemberInfoDto getMemberInfo(Long memberId);

//    MemberInfoDto getMemberInfo(Long memberId);
}
