package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.ChatGptDto;

public interface ChatGptService {
    String chatGptAnswer(ChatGptDto chatGptDto);
}
