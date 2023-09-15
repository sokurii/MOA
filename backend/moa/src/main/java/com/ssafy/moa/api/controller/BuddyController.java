package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.BuddyDto.*;
import com.ssafy.moa.api.service.BuddyService;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import static com.ssafy.moa.common.utils.ApiUtils.success;


@RestController
@RequestMapping("/buddy")
@RequiredArgsConstructor
public class BuddyController {

    private final BuddyService buddyService;

    @PostMapping("/korean")
    public ApiResult<Long> createKoreanBuddy(@RequestBody KoreanBuddyPostRequest koreanBuddyPostRequest) {
        System.out.println("koreanBuddyPostRequest.getGender() = " + koreanBuddyPostRequest.getGender());
        return success(buddyService.saveKoreanBuddyInfo(koreanBuddyPostRequest));
    }

    @PostMapping("/foreigner")
    public ApiResult<Long> createForeignerBuddy(@RequestBody ForeignerBuddyPostRequest foreignerBuddyPostRequest) {
        return success(buddyService.saveForeignerBuddyInfo(foreignerBuddyPostRequest));
    }

    @PostMapping("/match")
    public ApiResult<Long> createForeignerBuddy(@RequestBody BuddyMatchingRequest buddyMatchingRequest) {
        return success(buddyService.findMatchingBuddy(buddyMatchingRequest));
    }

    @DeleteMapping("/{memberId}")
    public ApiResult<Integer> deleteBuddy(@PathVariable Long memberId) {
        return success(buddyService.deleteBuddy(memberId));
    }

}
