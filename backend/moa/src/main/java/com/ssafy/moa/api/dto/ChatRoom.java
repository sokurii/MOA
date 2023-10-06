package com.ssafy.moa.api.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.util.UUID;


@Getter
@ToString
@NoArgsConstructor
public class ChatRoom implements Serializable {
    private static final long serialVersionUID = 6494678977089006639L;
    private String roomId;
    private String name;

    @Builder
    public ChatRoom(String roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }
}
