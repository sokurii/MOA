package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.jwt.JwtTokenProvider;
import com.ssafy.moa.api.service.MemberService;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import com.ssafy.moa.dto.LoginReqDto;
import com.ssafy.moa.dto.MemberSignUpDto;
import com.ssafy.moa.dto.TokenRespDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.moa.common.utils.ApiUtils.error;
import static com.ssafy.moa.common.utils.ApiUtils.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;

    // 회원가입
    @PostMapping("/signup")
    public ApiResult<MemberSignUpDto> signUp(@RequestBody MemberSignUpDto memberSignUpReqDto) {
        MemberSignUpDto memberSignUpRespDto = memberService.signUp(memberSignUpReqDto);
        return success(memberSignUpRespDto);
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

    // 테스트
    @GetMapping("/test")
    public ApiResult<?> test(@RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        return success(authentication.getName() + "은 접근 가능합니다.");
    }



}
