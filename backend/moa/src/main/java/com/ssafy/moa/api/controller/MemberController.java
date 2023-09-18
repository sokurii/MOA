package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.member.*;
import com.ssafy.moa.api.jwt.JwtTokenProvider;
import com.ssafy.moa.api.service.EmailService;
import com.ssafy.moa.api.service.impl.EmailServiceImpl;
import com.ssafy.moa.api.service.MemberService;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.moa.common.utils.ApiUtils.error;
import static com.ssafy.moa.common.utils.ApiUtils.success;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final EmailService emailService;

    private final JwtTokenProvider jwtTokenProvider;

    // 회원가입
    @PostMapping("/signup")
    public ApiResult<MemberSignUpDto> signUp(@RequestBody @Valid MemberSignUpDto memberSignUpReqDto) {
        MemberSignUpDto memberSignUpRespDto = memberService.signUp(memberSignUpReqDto);
        return success(memberSignUpRespDto);
    }

    @PostMapping("/signup/email")
    // 회원가입 시 이메일 인증번호 전송
    public ApiResult<String> sendEmailCode(@RequestBody EmailCheckDto emailCheckDto) throws Exception {
        String emailCode = emailService.sendSimpleMessage(emailCheckDto);
        return success(emailCode);
    }

    @DeleteMapping("/signup/email")
    // 회원가입 시 코드를 통한 이메일 인증
    public ApiResult<String> verifyEmailCode(@RequestBody EmailCodeDto emailCodeDto) {
        String verifyEmailStatus = emailService.verifyEmail(emailCodeDto);
        return success(verifyEmailStatus);
    }


    // 로그인
    @PostMapping("/login")
    public ApiResult<TokenRespDto> login(@RequestBody LoginReqDto loginReqDto) {
        TokenRespDto tokenRespDto = memberService.login(loginReqDto);
        return success(tokenRespDto);
    }

    // 로그아웃
    @DeleteMapping("/logout")
    public ApiResult<String> logout(@RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        memberService.logout(authentication);
        return success("로그아웃 성공");
    }

    // 회원 탈퇴
    @DeleteMapping
    public ApiResult<String> removeMember(@RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        String status = memberService.removeMember(memberId);
        return success(status);
    }

    // 테스트
    @GetMapping("/test")
    public ApiResult<?> test(@RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Authentication authentication = jwtTokenProvider.getAuthentication(token);
//        log.info("member의 Id는 " + jwtTokenProvider.extractMemberId(token).toString());

        return success(authentication.getName() + "은 접근 가능합니다.");
    }



}
