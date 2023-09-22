package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.quiz.*;
import com.ssafy.moa.api.entity.DailyKoreanQuiz;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.repository.DailyKoreanQuizRepository;
import com.ssafy.moa.api.repository.MemberRepository;
import com.ssafy.moa.api.repository.querydsl.QuizQueryRepository;
import com.ssafy.moa.api.service.QuizService;
import com.ssafy.moa.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final DailyKoreanQuizRepository dailyKoreanQuizRepository;
    private final QuizQueryRepository quizQueryRepository;
    private final MemberRepository memberRepository;

    // 단어 퀴즈 출제
    @Override
    public List<QuizQuestionDto> questionWordQuiz() {
        // QuizRepository에서 랜덤으로 15개의 Quiz를 가져온다.
        List<QuizQuestionDto> quizQuestionDtoList = quizQueryRepository.getRandomQuizzes();
        // 퀴즈에 따라 보기를 생성한다.
        // 퀴즈 유형 1,2는 답을 포함한 보기가 4개

        // 단어 보기 생성
        for(int i = 0; i<quizQuestionDtoList.size(); i++) {
            QuizQuestionDto quizQuestionDto = quizQuestionDtoList.get(i);
            if(quizQuestionDto.getQuizCategoryId() == 1 || quizQuestionDto.getQuizCategoryId() == 2) {
                log.info(quizQuestionDto.toString());

                // 퀴즈 보기 가져오기
                String quizAnswer = quizQuestionDto.getQuizAnswer();
               List<String> quizAnswerList = quizQueryRepository.getWordQuizAnswerList(quizAnswer);
               quizAnswerList.add(quizAnswer);
                Collections.shuffle(quizAnswerList);
                quizQuestionDto.setQuizAnswerList(quizAnswerList);

                quizQuestionDtoList.set(i, quizQuestionDto);
            }
        }

        return quizQuestionDtoList;
    }

    // 단어 퀴즈 한 개씩 제출 API
    @Override
    public QuizSubmitRespDto submitWordQuiz(QuizSubmitReqDto quizSubmitReqDto) {
        // quiz
        Long quizId = quizSubmitReqDto.getQuizId();
        DailyKoreanQuiz dailyKoreanQuiz = dailyKoreanQuizRepository.findByQuizId(quizId)
                .orElseThrow(() -> new NotFoundException(quizId + "에 해당하는 퀴즈를 찾지 못했습니다."));

        String quizAnswer = dailyKoreanQuiz.getQuizAnswer();
        Boolean isQuizCorrect = quizAnswer.equals(quizSubmitReqDto.getQuizSubmitAnswer());

        return QuizSubmitRespDto.builder()
                .quizId(quizId)
                .isQuizCorrect(isQuizCorrect)
                .quizAnswer(quizAnswer)
                .build();
    }

    // 퀴즈 완료 API
    @Override
    public QuizFinishRespDto finishQuiz(Long memberId, QuizFinishReqDto quizFinishReqDto) {
        // 퀴즈 맞춘 개수에 따라 메시지와 경험치 처리
        String quizMessage = "";
        int memberGetExp = 0;
        int correctQuizAnswerCnt = quizFinishReqDto.getCorrectQuizAnswerCnt();

        if(correctQuizAnswerCnt <= 15 && correctQuizAnswerCnt >= 12) {
            quizMessage = "화룡점정! 당신은 한국인인가요?";
            memberGetExp = 60;
        }
        else if(correctQuizAnswerCnt >= 8) {
            quizMessage = "이 분위기 그대로 만점에 도전하세요!";
            memberGetExp = 45;
        }
        else if(correctQuizAnswerCnt >= 4) {
            quizMessage = "조금만 더 노력해봐요!";
            memberGetExp = 30;
        }
        else if (correctQuizAnswerCnt >= 0){
            quizMessage = "MOA와 계속 한국어를 공부해봐요!";
            memberGetExp = 15;
        }

        // 경험치 획득 시키기
        Member member = memberRepository.findByMemberId(memberId)


        return QuizFinishRespDto.builder()
                .quizMessage(quizMessage)
                .memberGetExp(memberGetExp)
                .build();
    }
}
