import { nonAuthAxios } from "./nonAuthAxios";
import { authAxios } from './authAxios';

export const quizApi = {
  // 단어퀴즈
  getWordQuiz: () => {
    return nonAuthAxios.get('/quiz/word');
  },

  // 문장퀴즈
  getSentenceQuiz: () => {
    return nonAuthAxios.get('/quiz/sentence');
  },

  // 정답 확인
  submitAnswer: (data) => {
    return authAxios.post('/quiz', data);
  },

  // 퀴즈 완료(정답 수)
  finishQuiz : (correctQuizAnswerCnt) => {
    return authAxios.put('/quiz/finish', correctQuizAnswerCnt);
  },

  // 오답 수 
  getWrongAnswerCount: () => {
    return authAxios.get('/quiz/wrong-answer');
  },

  // 랜덤으로 틀린 문제 가져오기
  getRandomWrongAnswer: (data) => {
    return authAxios.post('/quiz/wrong-answer', data);
  },
};