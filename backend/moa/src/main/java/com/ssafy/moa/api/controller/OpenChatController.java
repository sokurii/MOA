package com.ssafy.moa.api.controller;


import com.ssafy.moa.api.dto.OpenChatDto.*;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.jwt.JwtTokenProvider;
import com.ssafy.moa.api.repository.ChatRoomRepository;
import com.ssafy.moa.api.service.MemberService;
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
    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping
    @Operation(summary = "오픈 채팅방 생성", description = "API 헤더에 access token 필요")
    public ApiResult<Long> saveOpenChat(@RequestHeader("Authorization") String header, MultipartFile multipartFile, @RequestPart(value = "saveOpenChatRequest") SaveOpenChatRequest saveOpenChatRequest) throws IOException {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        Member member = memberService.findMember(memberId);
        return success(openChatService.saveOpenChat(member, multipartFile, saveOpenChatRequest));
    }

    @PostMapping("/{openChatId}")
    @Operation(summary = "오픈 채팅방 멤버 가입", description = "path에는 채팅방 식별자 id, API 헤더에 access token 필요")
    public ApiResult<Long> saveOpenChatMember(@RequestHeader("Authorization") String header, @PathVariable Long openChatId) {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        Member member = memberService.findMember(memberId);
        return success(openChatService.saveOpenChatMember(member, openChatId));
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

    @DeleteMapping("/member/{openChatId}")
    @Operation(summary = "오픈 채팅방 멤버 삭제", description = "오픈 채팅방 API, API 헤더에 access token 필요")
    public ApiResult<Long> deleteOpenChatMember(@RequestHeader("Authorization") String header, @PathVariable Long openChatId) {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        Member member = memberService.findMember(memberId);
        return success(openChatService.deleteOpenChatMember(member, openChatId));
    }

    @DeleteMapping("/{openChatId}")
    @Operation(summary = "오픈 채팅방 삭제", description = "오픈 채팅방 API, API 헤더에 access token 필요")
    public ApiResult<Long> deleteOpenChat(@RequestHeader("Authorization") String header, @PathVariable Long openChatId) {
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        memberService.findMember(memberId);
        return success(openChatService.deleteOpenChat(openChatId));
    }
}
