import { axios } from './https';

export const matchingApi = {
  // 한국인 매칭 정보 등록
  koreanInfo : (data) => axios.post('buddy/korean', data),

  // 외국인 매칭 정보 등록
  foreignerInfo : (data) => axios.post('buddy/foreigner', data),

  // 매칭
  matching : (data) => axios.post('buddy/match', data),

};