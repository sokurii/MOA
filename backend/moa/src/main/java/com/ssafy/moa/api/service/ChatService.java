package com.ssafy.moa.api.service;

import org.springframework.web.socket.WebSocketSession;

public interface ChatService {
    <T> void sendMessage(WebSocketSession session, T message);
}
