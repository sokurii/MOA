package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.OpenChatDto.*;
import com.ssafy.moa.api.entity.OpenChat;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface OpenChatService {
    Long saveOpenChat(MultipartFile multipartFile, SaveOpenChatRequest saveOpenChatRequest) throws IOException;
    Long saveOpenChatMember(Long openChatId, SaveOpenChatMemberRequest saveOpenChatMemberRequest);
    OpenChatResponse findOpenChatOne(Long openChatId);
    List<OpenChatResponse> findOpenChat();
    OpenChat findOpenChat(Long openChatId);
    Long deleteOpenChatMember(Long openChatId, Long memberId);
    Long deleteOpenChat(Long openChatId);
}
