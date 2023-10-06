package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.TranslationDto;
import com.ssafy.moa.api.service.TranslateService;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import static com.ssafy.moa.common.utils.ApiUtils.success;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/translation")
@RequiredArgsConstructor
@Tag(name = "번역")
public class TranslateController {

    private final TranslateService translateService;

    @PostMapping
    public ApiResult<String> translateText(@RequestBody TranslationDto translationDto) {
        return success(translateService.translateText(translationDto.getTranslatedText()));
    }
}
