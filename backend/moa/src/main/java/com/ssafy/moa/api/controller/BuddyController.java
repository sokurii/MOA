package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.BuddyDto;
import com.ssafy.moa.api.entity.key.KoreanKey;
import com.ssafy.moa.api.service.BuddyService;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.ssafy.moa.common.utils.ApiUtils.success;


@RestController
@RequestMapping("/buddy")
@RequiredArgsConstructor
public class BuddyController {

    private final BuddyService buddyService;

    @PostMapping("/korean")
    public ApiResult<KoreanKey> createKoreanBuddy(@RequestBody BuddyDto.KoreanBuddyPostRequest koreanBuddyPostRequest) {
        KoreanKey koreanKey = buddyService.saveKoreanBuddyInfo(koreanBuddyPostRequest);
        System.out.println("koreanKeyController = " + koreanKey.toString());
        return success(koreanKey);
    }
}
