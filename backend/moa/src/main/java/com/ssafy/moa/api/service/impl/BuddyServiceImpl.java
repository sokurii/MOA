package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.BuddyDto.*;
import com.ssafy.moa.api.entity.*;
import com.ssafy.moa.api.entity.key.ForeignerKey;
import com.ssafy.moa.api.entity.key.InterestKey;
import com.ssafy.moa.api.entity.key.KoreanKey;
import com.ssafy.moa.api.repository.*;
import com.ssafy.moa.api.service.BuddyService;
import com.ssafy.moa.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class BuddyServiceImpl implements BuddyService {

    private final BuddyRepository buddyRepository;
    private final KoreanRepository koreanRepository;
    private final NationRepository nationRepository;
    private final InterestRepository interestRepository;
    private final InterestCodeRepository interestCodeRepository;
    private final ForeignerRepository foreignerRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public KoreanKey saveKoreanBuddyInfo(KoreanBuddyPostRequest buddyKoreanPostRequest) {
        NationCode nationCode = nationRepository.findByNationCode(buddyKoreanPostRequest.getNationCode())
                .orElseThrow(() -> new NotFoundException("Not Found Nation Code"));

        Member member = memberRepository.findByMemberId(buddyKoreanPostRequest.getMemberId())
                .orElseThrow(() -> new NotFoundException("Not Found Member"));

        KoreanKey koreanKey = KoreanKey.builder()
                .koreanId(buddyKoreanPostRequest.getMemberId())
                .koreanNationCode(nationCode).build();

        Korean korean = Korean.builder().koreanKey(koreanKey).koreanLikeGender(buddyKoreanPostRequest.getGender()).build();

        for(int i : buddyKoreanPostRequest.getInterest()) {
            InterestCode interestCode = interestCodeRepository.findByInterestCode(i).orElseThrow(
                    () -> new NotFoundException("Not Found Interest Code")
            );

            InterestKey.builder()
                    .memberId(member)
                    .interestCode(interestCode).build();
        }
        koreanRepository.save(korean);
        return koreanKey;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public ForeignerKey saveForeignerBuddyInfo(ForeignerBuddyPostRequest foreignerBuddyPostRequest) {
        NationCode nationCode = nationRepository.findByNationCode(foreignerBuddyPostRequest.getNationCode())
                .orElseThrow(() -> new NotFoundException("Not Found Nation Code"));

        // ForeignerKey 찾기
        ForeignerKey foreignerKey = ForeignerKey.builder()
                .foreignerId(foreignerBuddyPostRequest.getMemberId())
                .foreignerCode(nationCode).build();

        // Foreigner 를 찾기
        Foreigner foreigner = foreignerRepository.findByForeignerKey(foreignerKey)
                .orElseThrow(() -> new NotFoundException("Not Found Foreigner"));

        // 선호하는 성별 저장
        foreigner.update(foreignerBuddyPostRequest.getGender());
        System.out.println("foreigner.toString() = " + foreigner.toString());
        foreignerRepository.save(foreigner);

        Member member = memberRepository.findByMemberId(foreignerBuddyPostRequest.getMemberId())
                .orElseThrow(() -> new NotFoundException("Not Found Member"));

        // 관심사 등록
        for(int i : foreignerBuddyPostRequest.getInterest()) {
            InterestCode interestCode = interestCodeRepository.findByInterestCode(i).orElseThrow(
                    () -> new NotFoundException("Not Found Interest Code")
            );

            InterestKey.builder()
                    .memberId(member)
                    .interestCode(interestCode).build();
        }
        foreignerRepository.save(foreigner);
        return foreignerKey;
    }
}
