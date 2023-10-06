package com.ssafy.moa.api.repository.querydsl;

import com.ssafy.moa.api.dto.OpenChatDto;

import java.util.List;

public interface OpenChatQueryRepository {
    List<OpenChatDto.OpenChatResponse> findOpenChatList();
}
