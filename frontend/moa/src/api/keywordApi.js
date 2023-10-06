import { authAxios } from "./authAxios"
import { nonAuthAxios } from "./nonAuthAxios"

export const keywordApi = {
  // 등록한 키워드 조회
  getKeywords : () => authAxios.get('keyword'),

  // 키워드 등록
  saveKeywords : (data) => authAxios.post('keyword', data),

  // 인기 키워드 조회
  getPopularKeywords : () => nonAuthAxios.get('keyword/popularity'),

  // 키워드 삭제
  deleteKeyword : (keywordId) => nonAuthAxios.delete(`keyword/${keywordId}`),
}