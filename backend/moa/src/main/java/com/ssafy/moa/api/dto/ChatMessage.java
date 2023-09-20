package com.ssafy.moa.api.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ChatMessage {
    public enum MessageType {
        ENTER, TALK
    }


    private MessageType messageType;
    private Integer roomType;
    private String roomId;
    private String sender;
    private String message;
}
