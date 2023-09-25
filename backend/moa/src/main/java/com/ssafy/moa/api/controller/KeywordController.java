package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.KeywordDto;
import com.ssafy.moa.api.dto.KeywordReqDto;
import com.ssafy.moa.api.jwt.JwtTokenProvider;
import com.ssafy.moa.api.service.KeywordService;
import com.ssafy.moa.common.utils.ApiUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.moa.common.utils.ApiUtils.success;

@RestController
@RequestMapping("/keyword")
@RequiredArgsConstructor
@Tag(name = "Keyword", description = "키워드 API, 등록/조회 API에 access token 필요")
@Slf4j
public class KeywordController {
    private final KeywordService keywordService;
    private final JwtTokenProvider jwtTokenProvider;

    @Operation(summary = "키워드 등록", description = "밸런스게임을 등록할 수 있습니다.", tags = { "Keyword Controller" })
    @PostMapping
    public ApiUtils.ApiResult<Long> createKeyword(@RequestHeader("Authorization") String header, @RequestBody List<KeywordReqDto> keywordList){
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        return success(keywordService.createKeyword(memberId, keywordList));
    }

    @Operation(summary = "키워드 조회", description = "내가 등록한 키워드들을 조회 할 수 있습니다.", tags = { "Keyword Controller" })
    @GetMapping
    public ApiUtils.ApiResult<List<KeywordDto>> getAllKeyword(@RequestHeader("Authorization") String header){
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        return success(keywordService.getAllKeyword(memberId));
    }

    @Operation(summary = "키워드 삭제", description = "내가 등록한 키워드룰 삭제 할 수 있습니다.", tags = { "Keyword Controller" })
    @DeleteMapping("/{keywordId}")
    public ApiUtils.ApiResult<Long> deleteKeyword(@PathVariable("keywordId") Long keywordId){
        return success(keywordService.deleteKeyword(keywordId));
    }

    @Operation(summary = "인기 키워드 조회", description = "인기 키워드 3개를 조회 할 수 있습니다.", tags = { "Keyword Controller" })
    @GetMapping("/popularity")
    public ApiUtils.ApiResult<List<KeywordReqDto>> getBestKeyword(){
        return success(keywordService.getBestKeyword());
    }
}
