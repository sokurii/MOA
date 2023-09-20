package com.ssafy.moa.api.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.UUID;


@Getter
public class ChatRoom {
    private String roomId;
    private String name;

    @Builder
    public ChatRoom(String name) {
        this.roomId = UUID.randomUUID().toString();
        this.name = name;
    }
}
