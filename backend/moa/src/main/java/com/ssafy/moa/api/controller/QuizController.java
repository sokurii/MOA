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
    public ApiResult<QuizSubmitRespDto> submitWordQuiz(@RequestBody QuizSubmitReqDto quizSubmitReqDto) {
        QuizSubmitRespDto quizSubmitRespDto = quizService.submitWordQuiz(quizSubmitReqDto);
        return success(quizSubmitRespDto);
    }

    // 퀴즈 완료 API
    @PutMapping("/finish")
    @Operation(summary = "퀴즈를 완료하면 보내는 API")
    public ApiResult<QuizFinishRespDto> finishQuiz(@RequestHeader("Authorization") String header, @RequestBody QuizFinishReqDto quizFinishReqDto) {
        Long memberId = jwtTokenProvider.extractMemberId(header.substring(7));
        return success(quizService.finishQuiz(memberId, quizFinishReqDto));
    }
}
