package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.quiz.*;
import com.ssafy.moa.api.jwt.JwtTokenProvider;
import com.ssafy.moa.api.service.QuizService;
import com.ssafy.moa.common.utils.ApiUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import static com.ssafy.moa.common.utils.ApiUtils.success;

@Slf4j
@RestController
@RequiredArgsConstructor
@Tag(name = "quiz", description = "퀴즈 API")
@RequestMapping("/quiz")
public class QuizController {

    private final QuizService quizService;

    private final JwtTokenProvider jwtTokenProvider;

    // 단어 퀴즈 출제 API
    @GetMapping("/word")
    @Operation(summary = "단어 퀴즈 출제", description = "단어 퀴즈를 랜덤으로 15개 출제하는 API입니다.")
    public ApiResult<List<QuizQuestionDto>> questionWordQuiz(){
        List<QuizQuestionDto> quizQuestionDtoList = quizService.questionWordQuiz();
        return success(quizQuestionDtoList);
    }

    // 문장 퀴즈 출제 API
    @GetMapping("/sentence")
    @Operation(summary = "문장 퀴즈 출제")
    public ApiResult<List<QuizQuestionDto>> questionSentenceQuiz() {
        return success(quizService.questionSentenceQuiz());
    }

    // 퀴즈 제출 API
    @PostMapping
    @Operation(summary = "퀴즈 제출", description = "퀴즈를 풀고 한 문제씩 답을 확인하는 API입니다.")
    public ApiResult<QuizSubmitRespDto> submitWordQuiz(@RequestHeader("Authorization") String header, @RequestBody QuizSubmitReqDto quizSubmitReqDto) {
        Long memberId = jwtTokenProvider.extractMemberId(header.substring(7));
        QuizSubmitRespDto quizSubmitRespDto = quizService.submitWordQuiz(memberId, quizSubmitReqDto);
        return success(quizSubmitRespDto);
    }

    // 퀴즈 완료 API
    @PutMapping("/finish")
    @Operation(summary = "퀴즈를 완료하면 보내는 API")
    public ApiResult<QuizFinishRespDto> finishQuiz(@RequestHeader("Authorization") String header, @RequestBody QuizFinishReqDto quizFinishReqDto) {
        Long memberId = jwtTokenProvider.extractMemberId(header.substring(7));
        return success(quizService.finishQuiz(memberId, quizFinishReqDto));
    }

    // 틀린 문제 개수 반환
    @GetMapping("/wrong-answer")
    @Operation(summary = "틀린 문제의 개수를 반환")
    public ApiResult<QuizWrongCountDto> getWrongQuizCount(@RequestHeader("Authorization") String header) {
        Long memberId = jwtTokenProvider.extractMemberId(header.substring(7));
        return success(quizService.getWrongQuizCount(memberId));
    }

    // 틀린 문제에서 랜덤 출제
    @PostMapping("/wrong-answer")
    @Operation(summary = "틀린 문제에서 랜덤으로 문제 출제")
    public ApiResult<List<QuizQuestionDto>> submitWrongQuiz(@RequestHeader("Authorization") String header, @RequestBody QuizWrongCountDto quizWrongCountDto) {
        Long memberId = jwtTokenProvider.extractMemberId(header.substring(7));
        return success(quizService.submitWrongQuiz(memberId, quizWrongCountDto));
    }

    // 틀린 문제 삭제
    @DeleteMapping("/wrong-answer/{quizId}")
    @Operation(summary = "틀린 문제 풀기에서 맞춘 후 문제 삭제")
    public ApiResult<Long> deleteWrongQuiz(@RequestHeader("Authorization") String header, @PathVariable("quizId") Long quizId) {
        Long memberId = jwtTokenProvider.extractMemberId(header.substring(7));
        return success(quizService.deleteWrongQuiz(memberId, quizId));
    }


}
