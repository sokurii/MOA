import { nonAuthAxios } from "./nonAuthAxios";
import { authAxios } from './authAxios';

export const quizApi = {
  getWordQuiz: () => {
    return nonAuthAxios.get('/quiz/word');
  },

  // 정답 확인
  submitAnswer: (data) => {
    return authAxios.post('/quiz', data);
  },

  // 퀴즈 완료(정답 수)
  finishQuiz : (correctQuizAnswerCnt) => {
    return authAxios.put('/quiz/finish', correctQuizAnswerCnt);
  }
};