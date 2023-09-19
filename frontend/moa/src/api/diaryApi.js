import { axios } from './https';

export const diaryApi = {
  // 교환일기 전체 조회
  getDiaryList : () => axios.get('buddy/diary'),

  // 교환일기 상세 조회
  getDiaryDetail : (exchangeDiaryId) => axios.get(`buddy/diary/${exchangeDiaryId}`),

  // 교환일기 생성
  createDiary : (data) => axios.post('buddy/diary', data),

  // 교환일기 수정
  updateDiary : (exchangeDiaryId, data) => axios.put(`buddy/diary/${exchangeDiaryId}`, data),

  // 교환일기 삭제
  deleteDiary : (exchangeDiaryId) => axios.delete(`buddy/diary/${exchangeDiaryId}`),
}