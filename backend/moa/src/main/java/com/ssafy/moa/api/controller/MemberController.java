package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.member.*;
import com.ssafy.moa.api.jwt.JwtTokenProvider;
import com.ssafy.moa.api.service.EmailService;
import com.ssafy.moa.api.service.impl.EmailServiceImpl;
import com.ssafy.moa.api.service.MemberService;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static com.ssafy.moa.common.utils.ApiUtils.error;
import static com.ssafy.moa.common.utils.ApiUtils.success;

@Slf4j
@RestController
@RequiredArgsConstructor
@Tag(name = "member", description = "회원 관련 API")
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final EmailService emailService;

    private final JwtTokenProvider jwtTokenProvider;

    // 회원가입
    @PostMapping("/signup")
    @Operation(summary = "회원 가입", description = "회원 가입하는 API 입니다.")
    public ApiResult<MemberSignUpDto> signUp(@RequestBody @Valid MemberSignUpDto memberSignUpReqDto) {
        MemberSignUpDto memberSignUpRespDto = memberService.signUp(memberSignUpReqDto);
        return success(memberSignUpRespDto);
    }

    // 이메일 중복 체크
    @PostMapping("/signup/email-check")
    @Operation(summary = "회원 가입시 이메일 중복 체크")
    public ApiResult<EmailDuplicateCheckDto> checkEmailDuplicate(@RequestBody EmailCheckDto emailCheckDto) {
        return success(memberService.checkEmailDuplicate(emailCheckDto));
    }

    @PostMapping("/signup/email")
    @Operation(summary = "이메일 인증번호 전송")
    public ApiResult<String> sendEmailCode(@RequestBody EmailCheckDto emailCheckDto) throws Exception {
        String emailCode = emailService.sendSimpleMessage(emailCheckDto);
        return success(emailCode);
    }

    @DeleteMapping("/signup/email")
    @Operation(summary = "이메일 인증번호 검증")
    public ApiResult<String> verifyEmailCode(@RequestBody EmailCodeDto emailCodeDto) {
        String verifyEmailStatus = emailService.verifyEmail(emailCodeDto);
        return success(verifyEmailStatus);
    }


    // 로그인
    @PostMapping("/login")
    @Operation(summary = "로그인")
    public ApiResult<TokenRespDto> login(@RequestBody LoginReqDto loginReqDto, HttpServletResponse response) {
        TokenRespDto tokenRespDto = memberService.login(loginReqDto, response);
        return success(tokenRespDto);
    }

    // 로그아웃
    @DeleteMapping("/logout")
    @Operation(summary = "로그아웃")
    public ApiResult<String> logout(@RequestHeader("Authorization") String header, HttpServletResponse response) {
        String token = header.substring(7);
        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        memberService.logout(authentication, response);
        return success("로그아웃 성공");
    }

    // 회원 사진 수정
    @PutMapping(value = "/photo")
    @Operation(summary = "회원 사진 수정", description = "회원 사진을 수정하는 API 입니다.")
    public ApiResult<MemberPhotoDto> updateMemberPhoto(@RequestHeader("Authorization") String header, @RequestParam MultipartFile multipartFile) throws IOException {
        String token = header.substring(7);
        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        return success(memberService.updateMemberPhoto(memberId, multipartFile));
    }

    // 회원 정보 조회
    @GetMapping
    @Operation(summary = "회원 정보 조회", description = "회원 정보를 조회하는 API 입니다.")
    public ApiResult<MemberInfoDto> getMemberInfo(@RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        return success(memberService.getMemberInfo(memberId));
    }

    // 회원 탈퇴
    @DeleteMapping
    @Operation(summary = "회원 탈퇴")
    public ApiResult<String> removeMember(@RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        String status = memberService.removeMember(memberId);
        return success(status);
    }

}
