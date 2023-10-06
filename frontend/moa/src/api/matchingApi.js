import { authAxios } from "./authAxios";
import { nonAuthAxios } from "./nonAuthAxios";

export const matchingApi = {
  // 한국인 매칭 정보 등록
  koreanInfo : (data) => authAxios.post('buddy/korean', data),

  // 외국인 매칭 정보 등록
  foreignerInfo : (data) => nonAuthAxios.post('buddy/foreigner', data),

  // 매칭
  matching : () => authAxios.post('buddy/match'),

  // 매칭 여부 조회:
  isMatching: () => authAxios.get('buddy/whether'),

  // 버디와 함께 한 날짜
  withBuddy: () => authAxios.get('buddy'),

};