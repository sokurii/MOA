package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.ChatGptDto;
import com.ssafy.moa.api.dto.ChatMessage;
import com.ssafy.moa.api.repository.ChatRoomRepository;
import com.ssafy.moa.api.service.ChatGptService;
import com.ssafy.moa.common.handler.RedisPublisher;
import com.ssafy.moa.common.utils.ApiUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static com.ssafy.moa.common.utils.ApiUtils.success;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatGptService chatGptService;

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

    @PostMapping("/chat-gpt")
    public ApiUtils.ApiResult<String> questionChatGpt(@RequestBody @Valid ChatGptDto chatGptDto) {
        return success(chatGptService.chatGptAnswer(chatGptDto));
    }
}
