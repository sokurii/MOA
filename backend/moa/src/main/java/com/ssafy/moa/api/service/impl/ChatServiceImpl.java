package com.ssafy.moa.api.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.moa.api.dto.ChatDto;
import com.ssafy.moa.api.dto.ChatMessage;
import com.ssafy.moa.api.entity.BuddyMessage;
import com.ssafy.moa.api.entity.OpenChatMessage;
import com.ssafy.moa.api.repository.BuddyMessageRepository;
import com.ssafy.moa.api.repository.ChatRoomRepository;
import com.ssafy.moa.api.repository.OpenChatMessageRepository;
import com.ssafy.moa.api.service.ChatService;
import com.ssafy.moa.api.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ObjectMapper objectMapper;
    private final MemberService memberService;
    private final OpenChatMessageRepository chatRoomRepository;
    private final BuddyMessageRepository buddyMessageRepository;

    public <T> void sendMessage(WebSocketSession session, T message) {
        try {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }

    @Override
    public void chatSave(ChatMessage message) {
        if(message.getRoomType() == 1) { // 오픈 채팅
            OpenChatMessage openChatMessage = OpenChatMessage.builder()
                    .roomId(Long.valueOf(message.getRoomId()))
                    .sender(message.getSender())
                    .message(message.getMessage())
                    .time(LocalDateTime.now((ZoneId.of("Asia/Seoul"))))
                    .build();
            chatRoomRepository.save(openChatMessage);
        }
        else {
            BuddyMessage buddyMessage = BuddyMessage.builder()
                    .roomId(Long.valueOf(message.getRoomId()))
                    .sender(message.getSender())
                    .message(message.getMessage())
                    .time(LocalDateTime.now((ZoneId.of("Asia/Seoul"))))
                    .build();
            buddyMessageRepository.save(buddyMessage);
        }
    }

    @Override
    public List<ChatDto.ChatMessageResponse> getChatMessage(Long roomId, Integer type) {
        if(type == 1) { // 오픈 채팅
            List<OpenChatMessage> roomList = chatRoomRepository.findByRoomIdOrderByTimeDesc(roomId);
            ChatDto.ChatMessageListResponse response = ChatDto.ChatMessageListResponse.builder()
                    .chatMessageList(roomList)
                    .memberService(memberService)
                    .build();
            return response.getChatMessageResponseList();
        }
        else {
            List<BuddyMessage> roomList = buddyMessageRepository.findByRoomIdOrderByTimeDesc(roomId);
            ChatDto.BuddyMessageListResponse response = ChatDto.BuddyMessageListResponse.builder()
                    .chatMessageList(roomList)
                    .build();
            return response.getChatMessageResponseList();
        }
    }

}
