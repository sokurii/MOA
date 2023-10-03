package com.ssafy.moa.api.service.impl;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.ssafy.moa.api.dto.ChatRoom;
import com.ssafy.moa.api.dto.OpenChatDto.*;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.entity.OpenChat;
import com.ssafy.moa.api.entity.OpenChatMember;
import com.ssafy.moa.api.repository.ChatRoomRepository;
import com.ssafy.moa.api.repository.MemberRepository;
import com.ssafy.moa.api.repository.OpenChatMemberRepository;
import com.ssafy.moa.api.repository.OpenChatRepository;
import com.ssafy.moa.api.service.MemberService;
import com.ssafy.moa.api.service.OpenChatService;
import com.ssafy.moa.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class OpenChatServiceImpl implements OpenChatService {
    private final OpenChatRepository openChatRepository;
    private final OpenChatMemberRepository openChatMemberRepository;
    private final ChatRoomRepository chatRoomRepository;
    private final MemberService memberService;
    private final String bucketName = "diary_storage";
    private final Storage storage;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long saveOpenChat(Member member, MultipartFile multipartFile, SaveOpenChatRequest saveOpenChatRequest) throws IOException {
        String uuid = UUID.randomUUID().toString();
        String ext = multipartFile.getContentType();

        BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, "open_chat/" + uuid)
                .setContentType(ext)
                .build();
        storage.create(blobInfo, multipartFile.getInputStream());

        OpenChat openChat = OpenChat.builder()
                .openChatTitle(saveOpenChatRequest.getOpenChatTitle())
                .openChatContent(saveOpenChatRequest.getOpenChatContent())
                .openChatImgUrl(uuid)
                .member(member)
                .build();

        Long openChatId = openChatRepository.save(openChat).getOpenChatId();
        chatRoomRepository.createChatRoom(openChatId+"", saveOpenChatRequest.getOpenChatTitle());
        OpenChatMember openChatMember = OpenChatMember.builder()
                .member(member)
                .openChat(openChat)
                .build();
//        List<ChatRoom> allRoom = chatRoomRepository.findAllRoom(1);
//        ChatRoom roomById = chatRoomRepository.findRoomById(1, 14 + "");
        openChatMemberRepository.save(openChatMember);

        return openChat.getOpenChatId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long saveOpenChatMember(Member member, Long openChatId) {
        OpenChatMember openChatMember = OpenChatMember.builder()
                .member(member)
                .openChat(findOpenChat(openChatId))
                .build();
        return openChatMemberRepository.save(openChatMember).getOpenChatMemberId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long saveOpenChatMember(String memberId, String openChatId) {
        Member member = memberService.findMember(Long.valueOf(memberId));
        OpenChatMember openChatMember = OpenChatMember.builder()
                .member(member)
                .openChat(findOpenChat(Long.valueOf(openChatId)))
                .build();
        return openChatMemberRepository.save(openChatMember).getOpenChatMemberId();
    }

    @Override
    @Transactional(readOnly = true)
    public Boolean findOpenChatMember(String sender, String openChatId) {
        Member member = memberService.findMember(Long.valueOf(sender));
        if(openChatRepository.findByOpenChatIdAndMember(Long.valueOf(openChatId), member).isPresent()) return true;
        return false;
    }

    @Override
    @Transactional(readOnly = true)
    public OpenChatResponse findOpenChatOne(Long openChatId) {
        OpenChat openChat = findOpenChat(openChatId);
        Integer count = openChatMemberRepository.countByOpenChat(openChat);
        return OpenChatResponse.builder()
                .openChatMemberCount(count.longValue())
                .openChat(openChat)
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public List<OpenChatResponse> findOpenChat() {
        return openChatRepository.findOpenChatList();
    }

    @Override
    @Transactional(readOnly = true)
    public OpenChat findOpenChat(Long openChatId) {
        return openChatRepository.findByOpenChatId(openChatId)
                .orElseThrow(() -> new NotFoundException("Not Found OpenChat"));
    }

    @Override
    @Transactional
    public Long deleteOpenChatMember(Member member, Long openChatId) {
        OpenChat openChat = findOpenChat(openChatId);
        openChatMemberRepository.deleteByMember(member);
        return openChat.getOpenChatId();
    }

    @Override
    @Transactional
    public Long deleteOpenChat(Long openChatId) {
        findOpenChat(openChatId);
        openChatRepository.deleteByOpenChatId(openChatId);
        return 1L;
    }

}
