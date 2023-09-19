import { axios } from './https';

export const balanceGameApi = {
  // 밸런스게임 전체 조회
  getBalanceGameList : () => axios.get('balance'),

  // 밸런스게임 상세 조회
  getBalanceGameDetail : (balanceGameId) => axios.get(`balance/${balanceGameId}`),

  // 인기 밸런스게임 조회
  getBestBalanceGameList : () => axios.get('balance/best'),

  // 밸런스게임 생성
  createBalanceGame : (data) => axios.post('balance', data),

  // 밸런스게임 수정
  updateBalanceGame : (balanceGameId, data) => axios.put(`balance/${balanceGameId}`, data),

  // 밸런스게임 삭제
  deleteBalanceGame : (balanceGameId) => axios.delete(`balance/${balanceGameId}`),

  // 밸런스게임 반응 등록
  reaction : (data) => axios.post('balance/reaction', data),
}