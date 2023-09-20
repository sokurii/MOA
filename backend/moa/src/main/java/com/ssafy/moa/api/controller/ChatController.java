package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.ChatMessage;
import com.ssafy.moa.api.repository.ChatRoomRepository;
import com.ssafy.moa.common.handler.RedisPublisher;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final ChatRoomRepository chatRoomRepository;

    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        if (ChatMessage.MessageType.ENTER.equals(message.getMessageType())) {
            if(message.getRoomType() == 1) {
                chatRoomRepository.enterOpenChatRoom(message.getRoomId());
                message.setMessage(message.getSender() + "이 들어왔습니다.");
                redisPublisher.publish(chatRoomRepository.getOpenChatTopic(message.getRoomId()), message);
            }
            else {
                chatRoomRepository.enterBuddyChatRoom(message.getRoomId());
                message.setMessage(message.getSender() + "이 들어왔습니다.");
                redisPublisher.publish(chatRoomRepository.getBuddyChatTopic(message.getRoomId()), message);
            }
        }
    }
}
