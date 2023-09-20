package com.ssafy.moa.api.dto;

import com.ssafy.moa.api.entity.OpenChat;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

public class OpenChatDto {

    @Getter
    @NoArgsConstructor
    public static class SaveOpenChatRequest {
        private Long memberId;
        private String openChatTitle;
        private String openChatContent;
    }

    @Getter
    @NoArgsConstructor
    public static class SaveOpenChatMemberRequest {
        private Long memberId;
    }

    @Getter
    @NoArgsConstructor
    public static class OpenChatResponse {
        private Long openChatId;
        private Long openChatMemberCount;
        private String openChatTitle;
        private String openChatContent;
        private String openChatImgUrl;

        @Builder
        public OpenChatResponse(OpenChat openChat, Long openChatMemberCount) {
            this.openChatId = openChat.getOpenChatId();
            this.openChatMemberCount = openChatMemberCount;
            this.openChatTitle = openChat.getOpenChatTitle();
            this.openChatContent = openChat.getOpenChatContent();
            this.openChatImgUrl = openChat.getOpenChatImgUrl();
        }

        @Builder
        public OpenChatResponse(Long openChatId, Long openChatMemberCount, String openChatTitle, String openChatContent, String openChatImgUrl) {
            this.openChatId = openChatId;
            this.openChatMemberCount = openChatMemberCount;
            this.openChatTitle = openChatTitle;
            this.openChatContent = openChatContent;
            this.openChatImgUrl = openChatImgUrl;
        }
    }

    @Getter
    public static class OpenChatListResponse {
        private List<OpenChatResponse> openChatResponseList;
    }
}
