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
        if (ChatMessage.MessageType.OPEN_ENTER.equals(message.getMessageType())) {
            chatRoomRepository.enterOpenChatRoom(message.getRoomId());
            message.setMessage(message.getSender() + "이 들어왔습니다.");
            redisPublisher.publish(chatRoomRepository.getOpenChatTopic(message.getRoomId()), message);
        }
        else if(ChatMessage.MessageType.BUDDY_ENTER.equals(message.getMessageType())){
            chatRoomRepository.enterBuddyChatRoom(message.getRoomId());
            message.setMessage(message.getSender() + "이 들어왔습니다.");
            redisPublisher.publish(chatRoomRepository.getBuddyChatTopic(message.getRoomId()), message);
        }
        else if(ChatMessage.MessageType.OPEN_TALK.equals(message.getMessageType())){
            redisPublisher.publish(chatRoomRepository.getOpenChatTopic(message.getRoomId()), message);
        }
        else if(ChatMessage.MessageType.BUDDY_TALK.equals(message.getMessageType())) {
            redisPublisher.publish(chatRoomRepository.getBuddyChatTopic(message.getRoomId()), message);
        }
    }

    @PostMapping("/chat-gpt")
    public ApiUtils.ApiResult<String> questionChatGpt(@RequestBody @Valid ChatGptDto chatGptDto) {
        return success(chatGptService.chatGptAnswer(chatGptDto));
    }
}
