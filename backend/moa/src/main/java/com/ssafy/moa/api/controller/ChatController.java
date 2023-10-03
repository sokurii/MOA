package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.ChatDto;
import com.ssafy.moa.api.dto.ChatGptDto;
import com.ssafy.moa.api.dto.ChatMessage;
import com.ssafy.moa.api.repository.ChatRoomRepository;
import com.ssafy.moa.api.service.ChatGptService;
import com.ssafy.moa.api.service.ChatService;
import com.ssafy.moa.api.service.OpenChatService;
import com.ssafy.moa.common.handler.RedisPublisher;
import com.ssafy.moa.common.utils.ApiUtils;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.moa.common.utils.ApiUtils.success;

@Slf4j
@RestController
@RequiredArgsConstructor
public class ChatController {

    private final RedisPublisher redisPublisher;
    private final ChatRoomRepository chatRoomRepository;
    private final ChatGptService chatGptService;
    private final ChatService chatService;
    private final OpenChatService openChatService;

    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        if (ChatMessage.MessageType.OPEN_ENTER.equals(message.getMessageType())) {
            chatRoomRepository.enterOpenChatRoom(message.getRoomId());
            message.setMessage(message.getSender() + "이 들어왔습니다.");
            redisPublisher.publish(chatRoomRepository.getOpenChatTopic(message.getRoomId()), message);
            if(openChatService.findOpenChatMember(message.getSender(), message.getRoomId())) {
                return;
            }
            openChatService.saveOpenChatMember(message.getSender(), message.getRoomId());
        } else if (ChatMessage.MessageType.BUDDY_ENTER.equals(message.getMessageType())) {
            chatRoomRepository.enterBuddyChatRoom(message.getRoomId());
            message.setMessage(message.getSender() + "이 들어왔습니다.");
            redisPublisher.publish(chatRoomRepository.getBuddyChatTopic(message.getRoomId()), message);
            return;
        } else if (ChatMessage.MessageType.OPEN_TALK.equals(message.getMessageType())) {
            redisPublisher.publish(chatRoomRepository.getOpenChatTopic(message.getRoomId()), message);
        } else if (ChatMessage.MessageType.BUDDY_TALK.equals(message.getMessageType())) {
            redisPublisher.publish(chatRoomRepository.getBuddyChatTopic(message.getRoomId()), message);
        }
        chatService.chatSave(message);
    }

    @GetMapping("/chat/buddy/{roomId}")
    public ApiUtils.ApiResult<List<ChatDto.ChatMessageResponse>> getBuddyMessage(@PathVariable Long roomId) {
        log.info(String.valueOf(roomId));
        return success(chatService.getChatMessage(roomId, 2));
    }

    @GetMapping("/chat/open/{roomId}")
    public ApiUtils.ApiResult<List<ChatDto.ChatMessageResponse>> getOpenChatMessage(@PathVariable Long roomId) {
        return success(chatService.getChatMessage(roomId, 1));
    }

    @PostMapping("/chat-gpt")
    @Operation(summary = "chatgpt question & answer")
    public ApiUtils.ApiResult<String> questionChatGpt(@RequestBody @Valid ChatGptDto chatGptDto) {
        return success(chatGptService.chatGptAnswer(chatGptDto));
    }
}
