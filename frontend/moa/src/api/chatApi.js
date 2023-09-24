import { nonAuthAxios } from "./nonAuthAxios";
import { authAxios } from "./authAxios";

export const openChatApi = {
  // 오픈채팅방 전체 조회
  getOpenChatRoom : () => nonAuthAxios.get('open-chat'),
  
  // 오픈채팅방 상세 조회
  getOpenChatRoomDetail : (openChatId) => nonAuthAxios.get(`open-chat/${openChatId}`),

  // 오픈채팅방 생성
  createOpenChatRoom : (data) => authAxios.post('open-chat', data),

  // 오픈채팅방 참여
  participateOpenChatRoom : (openChatId, data) => authAxios.post(`open-chat/${openChatId}`, data),

  // 오픈채팅방 탈퇴
  exitOpenChatRoom : (openChatId, memberId) => authAxios.delete(`open-chat/${openChatId}/${memberId}`),

  // 오픈채팅방 삭제
  deleteOpenChatRoom : (openChatId) => authAxios.delete(`open-chat/${openChatId}`),
};