import { authAxios } from './https';

export const openChatApi = {
  // 오픈채팅방 전체 조회
  getOpenChatRoom : () => authAxios.get('open-chat'),
  
  // 오픈채팅방 상세 조회
  getOpenChatRoomDetail : (openChatId) => authAxios.get(`open-chat/${openChatId}`),

  // 오픈채팅방 생성
  createOpenChatRoom : (data) => authAxios.post('open-chat', data),

  // 오픈채팅방 참여
  participateOpenChatRoom : (openChatId, data) => authAxios.post(`open-chat/${openChatId}`, data),

  // 오픈채팅방 탈퇴
  exitOpenChatRoom : (openChatId, memberId) => authAxios.delete(`open-chat/${openChatId}/${memberId}`),

  // 오픈채팅방 삭제
  deleteOpenChatRoom : (openChatId) => authAxios.delete(`open-chat/${openChatId}`),
};