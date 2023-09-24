import { authAxios } from './authAxios';
import { nonAuthAxios } from './nonAuthAxios';

export const balanceGameApi = {
  // 밸런스게임 전체 조회
  getBalanceGameList : () => nonAuthAxios.get('balance'),

  // 밸런스게임 상세 조회
  getBalanceGameDetail : (balanceGameId) => nonAuthAxios.get(`balance/${balanceGameId}`),

  // 인기 밸런스게임 조회
  getBestBalanceGameList : () => nonAuthAxios.get('balance/best'),

  // 밸런스게임 생성
  createBalanceGame : (data) => authAxios.post('balance', data),

  // 밸런스게임 수정
  updateBalanceGame : (balanceGameId, data) => nonAuthAxios.put(`balance/${balanceGameId}`, data),

  // 밸런스게임 삭제
  deleteBalanceGame : (balanceGameId) => nonAuthAxios.delete(`balance/${balanceGameId}`),

  // 밸런스게임 반응 등록
  reaction : (data) => nonAuthAxios.post('balance/reaction', data),
}