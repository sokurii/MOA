package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.ChatDto;
import com.ssafy.moa.api.dto.ChatMessage;
import org.springframework.web.socket.WebSocketSession;

import java.util.List;

public interface ChatService {
    <T> void sendMessage(WebSocketSession session, T message);
    void chatSave(ChatMessage message);
    List<ChatDto.ChatMessageResponse> getChatMessage(Long roomId, Integer type);
}
