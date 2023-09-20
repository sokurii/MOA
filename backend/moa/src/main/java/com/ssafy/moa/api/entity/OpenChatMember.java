package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class OpenChatMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long openChatMemberId;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "open_chat_id", referencedColumnName = "open_chat_id")
    private OpenChat openChat;

    @Builder
    public OpenChatMember(Member member, OpenChat openChat) {
        this.member = member;
        this.openChat = openChat;
    }
}
