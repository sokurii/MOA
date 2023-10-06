package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class BuddyMessage {
    @Id
    @Column(name = "message_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;
    private Long roomId;
    private String sender;
    private String message;
    private LocalDateTime time;

    @Builder
    public BuddyMessage(Long roomId, String sender, String message, LocalDateTime time) {
        this.roomId = roomId;
        this.sender = sender;
        this.message = message;
        this.time = time;
    }
}
