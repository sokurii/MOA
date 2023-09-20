package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.quiz.QuizQuestionDto;
import com.ssafy.moa.api.service.QuizService;
import com.ssafy.moa.common.utils.ApiUtils;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import static com.ssafy.moa.common.utils.ApiUtils.success;

@RestController
@RequiredArgsConstructor
@RequestMapping("/quiz")
public class QuizController {

    private final QuizService quizService;

    // 퀴즈 출제 API
    @GetMapping
    @Operation(summary = "퀴즈 출제 API", description = "퀴즈를 랜덤으로 15개 출제하는 API입니다.")
    public ApiResult<List<QuizQuestionDto>> submitQuiz(){
        List<QuizQuestionDto> quizQuestionDtoList = quizService.submitQuiz();
        return success(quizQuestionDtoList);
    }

}
