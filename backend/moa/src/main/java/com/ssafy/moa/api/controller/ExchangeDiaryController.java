package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.ExchangeDiaryDto.*;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.jwt.JwtTokenProvider;
import com.ssafy.moa.api.service.ExchangeDiaryService;
import com.ssafy.moa.api.service.MemberService;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.ssafy.moa.common.utils.ApiUtils.success;

@RestController
@RequestMapping("/buddy/diary")
@RequiredArgsConstructor
@Tag(name = "exchange-diary", description = "교환일기 API, 모든 API 헤더에 access token 필요")
public class ExchangeDiaryController {

    private final ExchangeDiaryService exchangeDiaryService;
    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping
    @Operation(summary = "교환일기 생성")
    public ApiResult<Long> saveExchangeDiary(@RequestHeader("Authorization") String header, MultipartFile multipartFile, @RequestPart(value = "exchangeDiaryRequest") ExchangeDiaryRequest exchangeDiaryRequest) throws IOException {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        return success(exchangeDiaryService.saveExchangeDiary(multipartFile, exchangeDiaryRequest, memberId));
    }

    @GetMapping("/{exchangeDiaryId}")
    @Operation(summary = "교환일기 1개 조회")
    public ApiResult<ExchangeDiaryDetailResponse> getExchangeDiaryDetail(@RequestHeader("Authorization") String header, @PathVariable Long exchangeDiaryId) {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        memberService.findMember(memberId);
        return success(exchangeDiaryService.findExchangeDiaryDetail(exchangeDiaryId));
    }

    @GetMapping
    @Operation(summary = "교환일기 전체 조회")
    public ApiResult<List<ExchangeDiaryDetailResponse>> getExchangeDiary(@RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        Member member = memberService.findMember(memberId);
        return success(exchangeDiaryService.findExchangeDiary(member));
    }

    @GetMapping("/{year}/{month}")
    @Operation(summary = "교환일기 달 별로 조회")
    public ApiResult<List<ExchangeDiaryDetailResponse>> getExchangeDiaryByCalendar(@RequestHeader("Authorization") String header, @PathVariable("year") Integer year, @PathVariable("month") Integer month) {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        Member member = memberService.findMember(memberId);
        return success(exchangeDiaryService.findExchangeDiaryByMonth(member, year, month));
    }

    @DeleteMapping("/{exchangeDiaryId}")
    @Operation(summary = "교환일기 삭제")
    public ApiResult<Long> deleteExchangeDiary(@RequestHeader("Authorization") String header, @PathVariable Long exchangeDiaryId) {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        memberService.findMember(memberId);
        return success(exchangeDiaryService.deleteExchangeDiary(exchangeDiaryId));
    }

    @PutMapping("/{exchangeDiaryId}")
    @Operation(summary = "교환일기 수정")
    public ApiResult<Long> updateExchangeDiary(@RequestHeader("Authorization") String header, @PathVariable Long exchangeDiaryId, @RequestBody ExchangeDiaryUpdateRequest exchangeDiaryUpdateRequest) {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        memberService.findMember(memberId);
        return success(exchangeDiaryService.updateExchangeDiary(exchangeDiaryId, exchangeDiaryUpdateRequest));
    }

    @GetMapping("/today")
    @Operation(summary = "교환일기 오늘 버디가 적었고, 내가 안 적었는 지 조회", description = "true면 오늘 버디가 적었고, 내가 안 적음")
    public ApiResult<Boolean> todayExchangeDiary(@RequestHeader("Authorization") String header) {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        Member member = memberService.findMember(memberId);
        return success(exchangeDiaryService.isExchangeDiaryToday(member));
    }
}
