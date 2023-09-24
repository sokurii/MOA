package com.ssafy.moa.api.dto;

import com.ssafy.moa.api.entity.BuddyMessage;
import com.ssafy.moa.api.entity.OpenChatMessage;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class ChatDto {

    @Getter
    @NoArgsConstructor
    public static class ChatMessageResponse {
        private String sender;
        private String message;
        private LocalDateTime time;

        @Builder
        public ChatMessageResponse(String sender, String message, LocalDateTime time) {
            this.sender = sender;
            this.message = message;
            this.time = time;
        }
    }

    @Getter
    public static class ChatMessageListResponse {
        List<ChatMessageResponse> chatMessageResponseList;

        @Builder
        public ChatMessageListResponse(List<OpenChatMessage> chatMessageList) {
            List<ChatMessageResponse> chatList = chatMessageList.stream()
                    .map(chatMessage -> {
                        return ChatMessageResponse.builder()
                                .sender(chatMessage.getSender())
                                .message(chatMessage.getMessage())
                                .time(chatMessage.getTime())
                                .build();
                    })
                    .collect(Collectors.toList());
            this.chatMessageResponseList = chatList;
        }
    }

    @Getter
    public static class BuddyMessageListResponse {
        List<ChatMessageResponse> chatMessageResponseList;

        @Builder
        public BuddyMessageListResponse(List<BuddyMessage> chatMessageList) {
            List<ChatMessageResponse> chatList = chatMessageList.stream()
                    .map(chatMessage -> {
                        return ChatMessageResponse.builder()
                                .sender(chatMessage.getSender())
                                .message(chatMessage.getMessage())
                                .time(chatMessage.getTime())
                                .build();
                    })
                    .collect(Collectors.toList());
            this.chatMessageResponseList = chatList;
        }
    }
}
