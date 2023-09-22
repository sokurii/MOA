package com.ssafy.moa.api.service.impl;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.ssafy.moa.api.dto.ExchangeDiaryDto.*;
import com.ssafy.moa.api.dto.member.MemberDto;
import com.ssafy.moa.api.entity.*;
import com.ssafy.moa.api.repository.*;
import com.ssafy.moa.api.service.ExchangeDiaryService;
import com.ssafy.moa.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ExchangeDiaryServiceImpl implements ExchangeDiaryService {

    private final String bucketName = "diary_storage";
    private final Storage storage;
    private final String url = "https://storage.googleapis.com/";

    private final MemberRepository memberRepository;
    private final ExchangeDiaryRepository exchangeDiaryRepository;
    private final BuddyRepository buddyRepository;
    private final ForeignerRepository foreignerRepository;
    private final KoreanRepository koreanRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long saveExchangeDiary(MultipartFile multipartFile, ExchangeDiaryRequest exchangeDiaryRequest, Long memberId) throws IOException {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new NotFoundException("Not Found User"));

        String uuid = UUID.randomUUID().toString();
        String ext = multipartFile.getContentType();

        BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, "diary/" + uuid)
                .setContentType(ext)
                .build();
        storage.create(blobInfo, multipartFile.getInputStream());

        LocalDateTime now = LocalDateTime.now();
        ExchangeDiary exchangeDiary = ExchangeDiary.builder()
                .exchangeDiaryContent(exchangeDiaryRequest.getExchangeDiaryContent())
                .exchangeDiaryPicture(uuid)
                .exchangeDiaryDate(now)
                .member(member)
                .createdAt(now)
                .updatedAt(now)
                .build();
        return exchangeDiaryRepository.save(exchangeDiary).getExchangeDiaryId();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExchangeDiaryDetailResponse> findExchangeDiary(Member member) {
        Member buddyMember = findBuddyMember(member);
        List<ExchangeDiary> diaryList = exchangeDiaryRepository.findByMemberOrMember(member, buddyMember);
        return ExchangeDiaryResponse.builder().exchangeDiaryList(diaryList).build().getExchangeDiaryResponseList();
    }

    @Override
    @Transactional(readOnly = true)
    public List<ExchangeDiaryDetailResponse> findExchangeDiaryByMonth(Member member, Integer month) {
        Member buddyMember = findBuddyMember(member);
        List<ExchangeDiary> diaryList = exchangeDiaryRepository.findMonth(member, buddyMember, month);
        return ExchangeDiaryResponse.builder().exchangeDiaryList(diaryList).build().getExchangeDiaryResponseList();
    }

    @Override
    @Transactional(readOnly = true)
    public ExchangeDiaryDetailResponse findExchangeDiaryDetail(Long exchangeDiaryId) {
        ExchangeDiary exchangeDiary = exchangeDiaryRepository.findByExchangeDiaryId(exchangeDiaryId);
        String imgUrl = url + bucketName + "/" + exchangeDiary.getExchangeDiaryPicture();

        Member member = exchangeDiary.getMember();
        MemberDto memberDto = MemberDto.builder()
                .member(member)
                .build();

        return ExchangeDiaryDetailResponse.builder()
                .member(memberDto)
                .exchangeDiaryContent(exchangeDiary.getExchangeDiaryContent())
                .exchangeDiaryImgUrl(imgUrl)
                .exchangeDiaryDate(exchangeDiary.getExchangeDiaryDate())
                .build();
    }

    @Override
    @Transactional
    public Long deleteExchangeDiary(Long exchangeDiaryId) {
        return exchangeDiaryRepository.deleteByExchangeDiaryId(exchangeDiaryId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long updateExchangeDiary(Long exchangeId, ExchangeDiaryUpdateRequest exchangeDiaryUpdateRequest) {
        ExchangeDiary exchangeDiary = exchangeDiaryRepository.findByExchangeDiaryId(exchangeId);
        exchangeDiary.update(exchangeDiaryUpdateRequest.getExchangeDiaryContent());
        exchangeDiaryRepository.save(exchangeDiary);
        return exchangeDiary.getExchangeDiaryId();
    }

    @Override
    public Member findBuddyMember(Member member) {
        Buddy buddy = null;
        Member buddyMember = null;
        if(!member.getMemberIsForeigner()) { // 한국인이면
            Foreigner foreigner = foreignerRepository.findByMember(member)
                    .orElseThrow(() -> new NotFoundException("Not Found Foreigner"));
            buddy = buddyRepository.findByForeigner(foreigner)
                    .orElseThrow(() -> new NotFoundException("Not Found Buddy"));
            buddyMember = buddy.getKorean().getMember();
        }
        else {
            Korean korean = koreanRepository.findByMember(member)
                    .orElseThrow(() -> new NotFoundException("Not Found Korean"));
            buddy = buddyRepository.findByKorean(korean)
                    .orElseThrow(() -> new NotFoundException("Not Found Buddy"));
            buddyMember = buddy.getForeigner().getMember();
        }
        return buddyMember;
    }
}
