package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.ChatGptDto;
import com.ssafy.moa.api.service.ChatGptService;
import io.github.flashvayne.chatgpt.service.ChatgptService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatGptServiceImpl implements ChatGptService {

    private final ChatgptService chatgptService;
    @Override
    public String chatGptAnswer(ChatGptDto chatGptDto) {
        return chatgptService.sendMessage(chatGptDto.getQuestion());
    }
}
