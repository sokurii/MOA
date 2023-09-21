package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.BuddyDto.*;
import com.ssafy.moa.api.service.BuddyService;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.moa.common.utils.ApiUtils.success;


@RestController
@RequestMapping("/buddy")
@RequiredArgsConstructor
@Tag(name = "buddy", description = "버디 API")
public class BuddyController {

    private final BuddyService buddyService;

    @PostMapping("/korean")
    @Operation(summary = "한국인 버디 가입")
    public ApiResult<Long> createKoreanBuddy(@RequestBody KoreanBuddyPostRequest koreanBuddyPostRequest) {
        System.out.println("koreanBuddyPostRequest.getGender() = " + koreanBuddyPostRequest.getGender());
        return success(buddyService.saveKoreanBuddyInfo(koreanBuddyPostRequest));
    }

    @PostMapping("/foreigner")
    @Operation(summary = "외국인 버디 가입")
    public ApiResult<Long> createForeignerBuddy(@RequestBody ForeignerBuddyPostRequest foreignerBuddyPostRequest) {
        return success(buddyService.saveForeignerBuddyInfo(foreignerBuddyPostRequest));
    }

    @PostMapping("/match")
    @Operation(summary = "버디 매칭")
    public ApiResult<Long> createForeignerBuddy(@RequestBody BuddyMatchingRequest buddyMatchingRequest) {
        return success(buddyService.findMatchingBuddy(buddyMatchingRequest));
    }

    @DeleteMapping("/{memberId}")
    @Operation(summary = "버디 연결 끊기")
    public ApiResult<Integer> deleteBuddy(@PathVariable Long memberId) {
        return success(buddyService.deleteBuddy(memberId));
    }

    @GetMapping("/{memberId}")
    @Operation(summary = "버디와 함께한 날짜 조회")
    public ApiResult<Long> findWithBuddyDate(@PathVariable Long memberId) {
        return success(buddyService.findWithBuddyDate(memberId));
    }
}
