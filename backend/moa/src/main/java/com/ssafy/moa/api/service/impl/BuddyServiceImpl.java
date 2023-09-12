package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.BuddyDto.*;
import com.ssafy.moa.api.entity.InterestCode;
import com.ssafy.moa.api.entity.Korean;
import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.entity.NationCode;
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
    private final MemberRepository memberRepository;

    @Transactional(rollbackFor = Exception.class)
    @Override
    public KoreanKey saveKoreanBuddyInfo(KoreanBuddyPostRequest buddyKoreanPostRequest) {
        System.out.println("buddyKoreanPostRequest.getNationCode() = " + buddyKoreanPostRequest.getNationCode());
        
        NationCode nationCode = nationRepository.findByNationCode(buddyKoreanPostRequest.getNationCode())
                .orElseThrow(() -> new NotFoundException("Not Found Nation Code"));

        System.out.println("nationCode.toString() = " + nationCode.toString());
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
}
