package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.BuddyDto.*;
import com.ssafy.moa.api.jwt.JwtTokenProvider;
import com.ssafy.moa.api.repository.ChatRoomRepository;
import com.ssafy.moa.api.service.BuddyService;
import com.ssafy.moa.api.service.MemberService;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.moa.common.utils.ApiUtils.success;


@RestController
@RequestMapping("/buddy")
@RequiredArgsConstructor
@Tag(name = "buddy", description = "버디 API, 모든 API 헤더에 access token 필요")
public class BuddyController {

    private final BuddyService buddyService;
    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;
    private final ChatRoomRepository chatRoomRepository;

    @PostMapping("/korean")
    @Operation(summary = "한국인 버디 가입")
    public ApiResult<Long> createKoreanBuddy(@RequestHeader("Authorization") String header, @RequestBody KoreanBuddyPostRequest koreanBuddyPostRequest) {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        memberService.findMember(memberId);
        return success(buddyService.saveKoreanBuddyInfo(koreanBuddyPostRequest));
    }

    @PostMapping("/foreigner")
    @Operation(summary = "외국인 버디 가입")
    public ApiResult<Long> createForeignerBuddy(@RequestHeader("Authorization") String header, @RequestBody ForeignerBuddyPostRequest foreignerBuddyPostRequest) {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        memberService.findMember(memberId);
        return success(buddyService.saveForeignerBuddyInfo(memberId, foreignerBuddyPostRequest));
    }

    @PostMapping("/match")
    @Operation(summary = "버디 매칭")
    public ApiResult<Long> createForeignerBuddy(@RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        memberService.findMember(memberId);
        Long matchingBuddy = buddyService.findMatchingBuddy(memberId);
        if(matchingBuddy != null) {
            chatRoomRepository.createBuddyRoom(matchingBuddy+"","버디 채팅");
        }
        return success(matchingBuddy);
    }

    @DeleteMapping
    @Operation(summary = "버디 연결 끊기")
    public ApiResult<Integer> deleteBuddy(@RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        memberService.findMember(memberId);
        return success(buddyService.deleteBuddy(memberId));
    }

    @GetMapping
    @Operation(summary = "버디와 함께한 날짜 조회")
    public ApiResult<Long> findWithBuddyDate(@RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        memberService.findMember(memberId);
        return success(buddyService.findWithBuddyDate(memberId));
    }
}
