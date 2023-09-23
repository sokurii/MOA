package com.ssafy.moa.api.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ChatMessage {
    public enum MessageType {
        BUDDY_ENTER, OPEN_ENTER, BUDDY_TALK, OPEN_TALK
    }


    private MessageType messageType;
    private Integer roomType;
    private String roomId;
    private String sender;
    private String message;
}
