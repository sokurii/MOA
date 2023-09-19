package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.ExchangeDiaryDto.*;
import com.ssafy.moa.api.service.ExchangeDiaryService;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.ssafy.moa.common.utils.ApiUtils.success;

@RestController
@RequestMapping("/buddy/diary")
@RequiredArgsConstructor
public class ExchangeDiaryController {

    private final ExchangeDiaryService exchangeDiaryService;

    @PostMapping
    public ApiResult<Long> saveExchangeDiary(MultipartFile multipartFile, @RequestPart(value = "exchangeDiaryRequest") ExchangeDiaryRequest exchangeDiaryRequest) throws IOException {
        return success(exchangeDiaryService.saveExchangeDiary(multipartFile, exchangeDiaryRequest));
    }

    @GetMapping("/{exchangeDiaryId}")
    public ApiResult<ExchangeDiaryDetailResponse> getExchangeDiaryDetail(@PathVariable Long exchangeDiaryId) {
        return success(exchangeDiaryService.findExchangeDiaryDetail(exchangeDiaryId));
    }

    @GetMapping
    public ApiResult<List<ExchangeDiaryDetailResponse>> getExchangeDiary(@RequestParam("memberId") Long memberId) {
        return success(exchangeDiaryService.findExchangeDiary(memberId));
    }

    @DeleteMapping("/{exchangeDiaryId}")
    public ApiResult<Long> deleteExchangeDiary(@PathVariable Long exchangeDiaryId) {
        return success(exchangeDiaryService.deleteExchangeDiary(exchangeDiaryId));
    }

    @PutMapping("/{exchangeDiaryId}")
    public ApiResult<Long> updateExchangeDiary(@PathVariable Long exchangeDiaryId, @RequestBody ExchangeDiaryUpdateRequest exchangeDiaryUpdateRequest) {
        return success(exchangeDiaryService.updateExchangeDiary(exchangeDiaryId, exchangeDiaryUpdateRequest));
    }
}
