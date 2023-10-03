package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
public class OpenChat {
    @Id
    @Column(name = "open_chat_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long openChatId;

    private String openChatTitle;
    private String openChatContent;
    private String openChatImgUrl;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    private Member member;

    @OneToMany(mappedBy = "openChat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OpenChatMember> openChatMember;

    @Builder
    public OpenChat(String openChatTitle, String openChatContent, String openChatImgUrl, Member member) {
        this.openChatTitle = openChatTitle;
        this.openChatContent = openChatContent;
        this.openChatImgUrl = openChatImgUrl;
        this.member = member;
    }

    @Override
    public String toString() {
        return "OpenChat{" +
                "openChatId=" + openChatId +
                ", openChatTitle='" + openChatTitle + '\'' +
                ", openChatContent='" + openChatContent + '\'' +
                ", openChatImgUrl='" + openChatImgUrl + '\'' +
                ", member=" + member +
                ", openChatMember=" + openChatMember +
                '}';
    }
}
