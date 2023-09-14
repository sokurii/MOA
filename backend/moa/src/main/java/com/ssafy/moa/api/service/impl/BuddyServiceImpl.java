package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.BuddyDto.*;
import com.ssafy.moa.api.entity.*;
import com.ssafy.moa.api.repository.*;
import com.ssafy.moa.api.service.BuddyService;
import com.ssafy.moa.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

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
    public Long saveKoreanBuddyInfo(KoreanBuddyPostRequest buddyKoreanPostRequest) {
        NationCode nationCode = nationRepository.findByNationCode(buddyKoreanPostRequest.getNationCode())
                .orElseThrow(() -> new NotFoundException("Not Found Nation Code"));

        Member member = memberRepository.findByMemberId(buddyKoreanPostRequest.getMemberId())
                .orElseThrow(() -> new NotFoundException("Not Found Member"));

        Korean korean = Korean.builder()
                .koreanLikeGender(buddyKoreanPostRequest.getGender())
                .member(member)
                .nationCode(nationCode)
                .build();

        for(int i : buddyKoreanPostRequest.getInterest()) {
            InterestCode interestCode = interestCodeRepository.findByInterestCode(i).orElseThrow(
                    () -> new NotFoundException("Not Found Interest Code")
            );

            Interest interest = Interest.builder()
                    .member(member)
                    .interestCode(interestCode).build();
            interestRepository.save(interest);
        }
        return koreanRepository.save(korean).getKoreanId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long saveForeignerBuddyInfo(ForeignerBuddyPostRequest foreignerBuddyPostRequest) {
        NationCode nationCode = nationRepository.findByNationCode(foreignerBuddyPostRequest.getNationCode())
                .orElseThrow(() -> new NotFoundException("Not Found Nation Code"));

        Member member = memberRepository.findByMemberId(foreignerBuddyPostRequest.getMemberId())
                .orElseThrow(() -> new NotFoundException("Not Found Member"));


        // Foreigner 를 찾기
        Foreigner foreigner = foreignerRepository.findByForeignerId(foreignerBuddyPostRequest.getMemberId())
                .orElseThrow(() -> new NotFoundException("Not Found Foreigner"));

        // 선호하는 성별 저장
        foreigner.update(foreignerBuddyPostRequest.getGender());
        foreignerRepository.save(foreigner);


        // 관심사 등록
        for(int i : foreignerBuddyPostRequest.getInterest()) {
            InterestCode interestCode = interestCodeRepository.findByInterestCode(i).orElseThrow(
                    () -> new NotFoundException("Not Found Interest Code")
            );

            Interest interest = Interest.builder()
                    .member(member)
                    .interestCode(interestCode).build();
            interestRepository.save(interest);
        }
        return foreignerRepository.save(foreigner).getForeignerId();
    }

    @Override
    public Integer findMatchingBuddy(BuddyMatchingRequest buddyMatchingRequest) {
        // memberId로 외국인인지 판별
        Member member = memberRepository.findByMemberId(buddyMatchingRequest.getMemberId())
                .orElseThrow(() -> new NotFoundException("Not Found User"));

        List<Interest> interestList = interestRepository.findByInterestId(member.getMemberId());

        // 외국인이면
        if(member.getMemberIsForeigner()) {
//            List<Korean> koreanBuddy = koreanRepository.findKoreanBuddy(member.getMemberId());
//            if(koreanBuddy.isEmpty()) {
//                return null;
//            }
//            // TODO: 관심사와 국적이 맞는 한국인 찾기
//            if(!interestList.isEmpty()) {
//                for(Interest interest : interestList) {
//                    InterestCode interestCode = interest.getInterestCode();
//                    for(Korean k : koreanBuddy) {
//                        List<Interest> koreanInterestList = interestRepository.findByMemberId(k.getKoreanId());
//                        for(Interest koreanInterest : koreanInterestList) {
//
//                        }
//                    }
//                }
//            }

        }
        else { // 한국인이면
//            List<Foreigner> foreignerBuddy = foreignerRepository.findForeignerBuddy(member.getMemberId());
//            if(foreignerBuddy.isEmpty()) {
//                return null;
//            }
            // TODO: 관심사와 국적이 맞는 외국인 찾기

        }


        return null;
    }
}
