package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.OpenChatDto.*;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.entity.OpenChat;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface OpenChatService {
    Long saveOpenChat(Member member, MultipartFile multipartFile, SaveOpenChatRequest saveOpenChatRequest) throws IOException;
    Long saveOpenChatMember(Member member, Long openChatId);
    Long saveOpenChatMember(String memberId, String openChatId);

    Boolean findOpenChatMember(String sender, String openChatId);
    OpenChatResponse findOpenChatOne(Long openChatId);
    List<OpenChatResponse> findOpenChat();
    OpenChat findOpenChat(Long openChatId);
    Long deleteOpenChatMember(Member member, Long openChatId);
    Long deleteOpenChat(Long openChatId);
}
