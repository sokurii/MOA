import { authAxios } from './https';

export const balanceGameApi = {
  // 밸런스게임 전체 조회
  getBalanceGameList : () => authAxios.get('balance'),

  // 밸런스게임 상세 조회
  getBalanceGameDetail : (balanceGameId) => authAxios.get(`balance/${balanceGameId}`),

  // 인기 밸런스게임 조회
  getBestBalanceGameList : () => authAxios.get('balance/best'),

  // 밸런스게임 생성
  createBalanceGame : (data) => authAxios.post('balance', data),

  // 밸런스게임 수정
  updateBalanceGame : (balanceGameId, data) => authAxios.put(`balance/${balanceGameId}`, data),

  // 밸런스게임 삭제
  deleteBalanceGame : (balanceGameId) => authAxios.delete(`balance/${balanceGameId}`),

  // 밸런스게임 반응 등록
  reaction : (data) => authAxios.post('balance/reaction', data),
}