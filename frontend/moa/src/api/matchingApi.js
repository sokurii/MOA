import { nonAuthAxios } from './https';

export const matchingApi = {
  // 한국인 매칭 정보 등록
  koreanInfo : (data) => nonAuthAxios.post('buddy/korean', data),

  // 외국인 매칭 정보 등록
  foreignerInfo : (data) => nonAuthAxios.post('buddy/foreigner', data),

  // 매칭
  matching : (data) => nonAuthAxios.post('buddy/match', data),

};