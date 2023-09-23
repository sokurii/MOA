package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.quiz.*;
import com.ssafy.moa.api.entity.DailyKoreanQuiz;
import com.ssafy.moa.api.entity.Level;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.entity.QuizWrongAnswer;
import com.ssafy.moa.api.repository.DailyKoreanQuizRepository;
import com.ssafy.moa.api.repository.LevelRepository;
import com.ssafy.moa.api.repository.MemberRepository;
import com.ssafy.moa.api.repository.QuizWrongAnswerRepository;
import com.ssafy.moa.api.repository.querydsl.QuizQueryRepository;
import com.ssafy.moa.api.service.QuizService;
import com.ssafy.moa.common.exception.NotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuizServiceImpl implements QuizService {

    private final DailyKoreanQuizRepository dailyKoreanQuizRepository;
    private final QuizQueryRepository quizQueryRepository;
    private final QuizWrongAnswerRepository quizWrongAnswerRepository;
    private final MemberRepository memberRepository;
    private final LevelRepository levelRepository;


    // 단어 퀴즈 출제
    @Override
    public List<QuizQuestionDto> questionWordQuiz() {
        // QuizRepository에서 랜덤으로 15개의 Quiz를 가져온다.
        List<QuizQuestionDto> quizQuestionDtoList = quizQueryRepository.getRandomQuizzes();

        // 퀴즈에 따라 보기를 생성한다.
        // 퀴즈 유형 1,2는 답을 포함한 보기가 4개
        createWordOptions(quizQuestionDtoList);

        return quizQuestionDtoList;
    }

    // 단어 퀴즈 한 개씩 제출 API
    @Override
    public QuizSubmitRespDto submitWordQuiz(Long memberId, QuizSubmitReqDto quizSubmitReqDto) {
        // quiz
        Long quizId = quizSubmitReqDto.getQuizId();
        DailyKoreanQuiz dailyKoreanQuiz = dailyKoreanQuizRepository.findByQuizId(quizId)
                .orElseThrow(() -> new NotFoundException(quizId + "에 해당하는 퀴즈를 찾지 못했습니다."));

        String quizAnswer = dailyKoreanQuiz.getQuizAnswer();
        Boolean isQuizCorrect = quizAnswer.equals(quizSubmitReqDto.getQuizSubmitAnswer());

        // quiz가 틀렸을 경우 오답노트에 추가해야한다.
        if(!isQuizCorrect) {
            Member member = memberRepository.findByMemberId(memberId)
                    .orElseThrow(() -> new NotFoundException(memberId + "에 해당하는 member가 없습니다."));

            QuizWrongAnswer quizWrongAnswer = QuizWrongAnswer.builder()
                    .member(member)
                    .quiz(dailyKoreanQuiz)
                    .build();

            quizWrongAnswerRepository.save(quizWrongAnswer);
        }

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

        if (correctQuizAnswerCnt <= 15 && correctQuizAnswerCnt >= 12) {
            quizMessage = "화룡점정! 당신은 한국인인가요?";
            memberGetExp = 60;
        } else if (correctQuizAnswerCnt >= 8) {
            quizMessage = "이 분위기 그대로 만점에 도전하세요!";
            memberGetExp = 45;
        } else if (correctQuizAnswerCnt >= 4) {
            quizMessage = "조금만 더 노력해봐요!";
            memberGetExp = 30;
        } else if (correctQuizAnswerCnt >= 0) {
            quizMessage = "MOA와 계속 한국어를 공부해봐요!";
            memberGetExp = 15;
        }

        // 경험치 획득 시키기
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new NotFoundException(memberId + "에 해당하는 member를 찾을 수 없습니다."));
        member.updateMemberExp(member.getMemberExp() + memberGetExp);

        updateMemberLevel(member);

        memberRepository.save(member);

        return QuizFinishRespDto.builder()
                .quizMessage(quizMessage)
                .memberGetExp(memberGetExp)
                .build();
    }

    // 문장 퀴즈 출제 API
    @Override
    public List<QuizQuestionDto> questionSentenceQuiz() {
        List<QuizQuestionDto> quizQuestionDtoList = quizQueryRepository.getRandomSentenceQuizzes();

        // 퀴즈 보기 생성
        // 1. StringTokenizer를 사용하여 문제 답을 토큰화 시켜 나누자.
        // 2. 보기는 총 9개가 있어야한다.
        createSentenceOptions(quizQuestionDtoList);

        return quizQuestionDtoList;
    }


    @Override
    public QuizWrongCountDto getWrongQuizCount(Long memberId) {
        return QuizWrongCountDto.builder()
                .quizWrongCount(quizWrongAnswerRepository.getWrongQuizCount(memberId).intValue())
                .build();
    }

    // 틀린 문제에서 퀴즈 랜덤 출제
    @Override
    public List<QuizQuestionDto> submitWrongQuiz(Long memberId, QuizWrongCountDto quizWrongCountDto) {
        Integer quizWrongCount = quizWrongCountDto.getQuizWrongCount();

        // 퀴즈를 랜덤으로 가져온다.
        List<QuizQuestionDto> quizQuestionDtoList = quizWrongAnswerRepository.getRandomWrongQuizzes(memberId, quizWrongCount);

        for(QuizQuestionDto quizQuestionDto : quizQuestionDtoList) {
            Long quizCategoryId = quizQuestionDto.getQuizCategoryId();
            if(quizCategoryId == 1 || quizCategoryId == 2) createWordOptions(quizQuestionDtoList);
            else if(quizCategoryId == 3 || quizCategoryId == 4) createSentenceOptions(quizQuestionDtoList);
        }

        return quizQuestionDtoList;
    }

    // 틀린 문제에서 문제 삭제
    @Transactional
    @Override
    public Long deleteWrongQuiz(Long memberId, Long quizId) {
        return quizWrongAnswerRepository.deleteWrongQuiz(memberId, quizId);
    }

    // 단어 퀴즈 보기 생성
    private void createWordOptions(List<QuizQuestionDto> quizQuestionDtoList) {
        // 단어 보기 생성
        for (int i = 0; i < quizQuestionDtoList.size(); i++) {
            QuizQuestionDto quizQuestionDto = quizQuestionDtoList.get(i);

            if(quizQuestionDto.getQuizCategoryId() == 1 || quizQuestionDto.getQuizCategoryId() == 2) {
                // 퀴즈 보기 가져오기
                String quizAnswer = quizQuestionDto.getQuizAnswer();
                List<String> quizAnswerList = quizQueryRepository.getWordQuizAnswerList(quizAnswer);
                quizAnswerList.add(quizAnswer);
                Collections.shuffle(quizAnswerList);
                quizQuestionDto.setQuizAnswerList(quizAnswerList);

                quizQuestionDtoList.set(i, quizQuestionDto);
            }
        }
    }

    // 문장 퀴즈 보기 생성
    private void createSentenceOptions(List<QuizQuestionDto> quizQuestionDtoList) {
        for(int i = 0; i<quizQuestionDtoList.size(); i++) {
            QuizQuestionDto quizQuestionDto = quizQuestionDtoList.get(i);
            if(quizQuestionDto.getQuizCategoryId() == 3 || quizQuestionDto.getQuizCategoryId() == 4) {
                String quizAnswer = quizQuestionDto.getQuizAnswer();

                StringTokenizer stringTokenizer = new StringTokenizer(quizAnswer);

                List<String> quizAnswerList = new ArrayList<>();
                int cnt = 0;
                while(stringTokenizer.hasMoreTokens()) {
                    String token = stringTokenizer.nextToken();
                    quizAnswerList.add(token);
                    cnt++;
                }

                // 3. 단어 퀴즈 answer 값 랜덤으로 9개 가져와서 남은 개수만큼 넣어주기
                List<String> quizAnswerCandidateList = quizQueryRepository.getQuizAnswerCandidates();

                int remainWordCnt = 9 - cnt;
                for(int r = 0; r < remainWordCnt; r++) {
                    quizAnswerList.add(quizAnswerCandidateList.get(r));
                }

                Collections.shuffle(quizAnswerList);
                quizQuestionDto.setQuizAnswerList(quizAnswerList);
                quizQuestionDtoList.set(i, quizQuestionDto);
            }
        }

    }

    public void updateMemberLevel(Member member) {
        // member level up 조건인지 확인하기
        // 1. member의 현재 경험치와 레벨업 조건을 확인한다.
        Integer requiredExp = member.getMemberLevel().getRequiredExp();
        Integer memberExp = member.getMemberExp();

        // 2. 사용자의 현재 경험치가 member 레벨 업 조건보다 크거나 같다면 레벨업을 한다.
        if (memberExp >= requiredExp) {
            Long newLevelId = member.getMemberLevel().getLevelId() + 1;

            Level newLevel = levelRepository.findByLevelId(newLevelId)
                    .orElseThrow(() -> new NotFoundException(newLevelId + "에 해당하는 레벨이 없습니다."));

            // 레벨업
            member.updateMemberLevel(newLevel);
            // 경험치 세팅
            member.updateMemberExp(memberExp - requiredExp);

            memberRepository.save(member);
        }
    }
}
