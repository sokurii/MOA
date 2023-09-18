package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.BalanceGameDto;
import com.ssafy.moa.api.dto.BalanceGameReactionDto;
import com.ssafy.moa.api.dto.BalanceGameReqDto;
import com.ssafy.moa.api.dto.BalanceGameResDto;
import com.ssafy.moa.api.jwt.JwtTokenProvider;
import com.ssafy.moa.api.service.BalanceGameService;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.moa.common.utils.ApiUtils.success;
@RestController
@RequestMapping("/balance")
@RequiredArgsConstructor
@Slf4j
public class BalanceGameController {
    private final BalanceGameService balanceGameService;
    private final JwtTokenProvider jwtTokenProvider;

    @Operation(summary = "밸런스게임 등록", description = "밸런스게임을 등록할 수 있습니다.", tags = { "BalanceGame Controller" })
    // Todo : 추후 authentication를 사용해서 실제 memberId로 변경
    @PostMapping
    public ApiResult<Long> createBalanceGame(/*@RequestHeader("Authorization") String header,*/ @RequestBody BalanceGameReqDto balanceGameReqDto){
//        String token = header.substring(7);
//        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        Long memberId = 4L;
        log.info(balanceGameReqDto.toString());
        return success(balanceGameService.createBalanceGame(memberId, balanceGameReqDto));
    }

    @Operation(summary = "밸런스게임 전체 조회", description = "전체 밸런스게임을 최신순으로 조회할 수 있습니다. (밸런스게임 고유 Id, 제목) 반환", tags = { "BalanceGame Controller" })
    @GetMapping
    public ApiResult<List<BalanceGameResDto>> getAllBalanceGame(){
        return success(balanceGameService.getAllBalanceGame());
    }

    @Operation(summary = "밸런스게임 상세 조회", description = "밸런스게임을 디테일하게 조회할 수 있습니다.", tags = { "BalanceGame Controller" })
    @GetMapping("/{balanceGameId}")
    public ApiResult<BalanceGameDto> getBalanceGame(@PathVariable("balanceGameId") Long balanceGameId){
        return success(balanceGameService.getBalanceGame(balanceGameId));
    }

    @Operation(summary = "밸런스게임 수정", description = "선택한 밸런스게임을 수정할 수 있습니다.", tags = { "BalanceGame Controller" })
    @PutMapping("/{balanceGameId}")
    public ApiResult<Long> updateBalanceGame(@PathVariable("balanceGameId") Long balanceGameId, @RequestBody BalanceGameDto balanceGameDto){
        return success(balanceGameService.updateBalanceGame(balanceGameDto));
    }

    @Operation(summary = "밸런스게임 삭제", description = "선택한 밸런스게임을 삭제할 수 있습니다.", tags = { "BalanceGame Controller" })
    @DeleteMapping("/{balanceGameId}")
    public ApiResult<Long> deleteBalanceGame(@PathVariable("balanceGameId") Long balanceGameId){
        return success(balanceGameService.deleteBalanceGame(balanceGameId));
    }

    // Todo : 추후 authentication를 사용해서 실제 memberId로 변경
    @Operation(summary = "밸런스게임 반응 등록", description = "진행한 밸런스게임의 반응을 등록합니다.", tags = { "BalanceGame Controller" })
    @PostMapping("/reaction")
    public ApiResult<Long> createBalanceGameReaction(/*@RequestHeader("Authorization") String header,*/ @RequestBody BalanceGameReactionDto balanceGameReactionDto){
        Long memberId = 4L;
        return success(balanceGameService.createBalanceGameReaction(memberId, balanceGameReactionDto));
    }

    @Operation(summary = "인기 밸런스게임 조회", description = "인기 밸런스게임을 조회할 수 있습니다. (좋아요>보통>나쁨 순)", tags = { "BalanceGame Controller" })
    @GetMapping("/best")
    public ApiResult<List<BalanceGameResDto>> getBestBalanceGame(){
        return success(balanceGameService.getBestBalanceGame());
    }
}
