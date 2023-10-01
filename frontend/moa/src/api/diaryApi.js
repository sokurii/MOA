import { authAxios } from "./authAxios"

export const diaryApi = {
  // 교환일기 전체 조회
  getDiaryList: (year, month) => authAxios.get(`buddy/diary/${year}/${month}`),

  // 교환일기 상세 조회
  getDiaryDetail: (exchangeDiaryId) => authAxios.get(`buddy/diary/${exchangeDiaryId}`),

  // 교환일기 생성
  createDiary: (data) => authAxios.post('buddy/diary', data),

  // 교환일기 수정
  updateDiary: (exchangeDiaryId, data) => authAxios.put(`buddy/diary/${exchangeDiaryId}`, data),

  // 교환일기 삭제
  deleteDiary: (exchangeDiaryId) => authAxios.delete(`buddy/diary/${exchangeDiaryId}`),
}