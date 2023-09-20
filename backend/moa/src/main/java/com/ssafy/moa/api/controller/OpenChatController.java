package com.ssafy.moa.api.controller;


import com.ssafy.moa.api.dto.OpenChatDto.*;
import com.ssafy.moa.api.repository.ChatRoomRepository;
import com.ssafy.moa.api.service.OpenChatService;
import com.ssafy.moa.common.utils.ApiUtils.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

import static com.ssafy.moa.common.utils.ApiUtils.success;

@RestController
@RequestMapping("/open-chat")
@Tag(name = "open-chat", description = "오픈 채팅방 API")
@RequiredArgsConstructor
public class OpenChatController {
    private final OpenChatService openChatService;

    @PostMapping
    @Operation(summary = "오픈 채팅방 생성")
    public ApiResult<Long> saveOpenChat(MultipartFile multipartFile, @RequestPart(value = "saveOpenChatRequest") SaveOpenChatRequest saveOpenChatRequest) throws IOException {
        return success(openChatService.saveOpenChat(multipartFile, saveOpenChatRequest));
    }

    @PostMapping("/{openChatId}")
    @Operation(summary = "오픈 채팅방 멤버 가입", description = "path에는 채팅방 식별자 id, body에는 멤버 식별자 id")
    public ApiResult<Long> saveOpenChatMember(@PathVariable Long openChatId, @RequestBody SaveOpenChatMemberRequest saveOpenChatMemberRequest) {
        return success(openChatService.saveOpenChatMember(openChatId, saveOpenChatMemberRequest));
    }


    @GetMapping
    @Operation(summary = "오픈 채팅방 전체 조회")
    public ApiResult<List<OpenChatResponse>> getOpenChatList() {
        return success(openChatService.findOpenChat());
    }

    @GetMapping("/{openChatId}")
    @Operation(summary = "오픈 채팅방 한 개 조회")
    public ApiResult<OpenChatResponse> getOpenChatList(@PathVariable Long openChatId) {
        return success(openChatService.findOpenChatOne(openChatId));
    }

    @DeleteMapping("/{openChatId}/{memberId}")
    @Operation(summary = "오픈 채팅방 멤버 삭제")
    public ApiResult<Long> deleteOpenChatMember(@PathVariable Long openChatId, @PathVariable Long memberId) {
        return success(openChatService.deleteOpenChatMember(openChatId, memberId));
    }

    @DeleteMapping("/{openChatId}")
    @Operation(summary = "오픈 채팅방 삭제")
    public ApiResult<Long> deleteOpenChatMember(@PathVariable Long openChatId) {
        return success(openChatService.deleteOpenChat(openChatId));
    }
}
