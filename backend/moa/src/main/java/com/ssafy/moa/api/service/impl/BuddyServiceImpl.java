package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.BuddyDto.*;
import com.ssafy.moa.api.entity.*;
import com.ssafy.moa.api.repository.*;
import com.ssafy.moa.api.service.BuddyService;
import com.ssafy.moa.api.service.MemberService;
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
    private final MemberService memberService;
    private final MemberRepository memberRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long saveKoreanBuddyInfo(KoreanBuddyPostRequest buddyKoreanPostRequest) {
        NationCode nationCode = nationRepository.findByNationCode(buddyKoreanPostRequest.getNationCode())
                .orElseThrow(() -> new NotFoundException("Not Found Nation Code"));

        Member member = memberService.findMember(buddyKoreanPostRequest.getMemberId());
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
        Member member = memberService.findMember(foreignerBuddyPostRequest.getMemberId());
        // Foreigner 를 찾기
        Foreigner foreigner = foreignerRepository.findByMember(member)
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
    public Long findMatchingBuddy(BuddyMatchingRequest buddyMatchingRequest) {
        // memberId로 외국인인지 판별
        Member member = memberService.findMember(buddyMatchingRequest.getMemberId());

        // 외국인이면
        if(member.getMemberIsForeigner()) {
            Foreigner foreigner = foreignerRepository.findByMember(member)
                    .orElseThrow(() -> new NotFoundException("Not Found Foreigner"));

            List<Korean> koreanBuddyGenderAndNation = memberRepository.findKoreanBuddyGenderAndNation(member.getMemberId());
            if(!koreanBuddyGenderAndNation.isEmpty()) {
                for(Korean korean : koreanBuddyGenderAndNation) {
                    Integer count = interestRepository.countByInterest(member.getMemberId(), korean.getMember().getMemberId());
                    if(count > 0) {
                        Buddy buddy = Buddy.builder()
                                .korean(korean)
                                .foreigner(foreigner).build();
                        return buddyRepository.save(buddy).getBuddyId();
                    }
                }

                Buddy buddy = Buddy.builder()
                        .korean(koreanBuddyGenderAndNation.get(0))
                        .foreigner(foreigner).build();
                return buddyRepository.save(buddy).getBuddyId();
            }

            // 2순위: 성별, 관심사(무관)
            List<Korean> koreanBuddyGender = memberRepository.findKoreanBuddyGender(member.getMemberId());
            if(!koreanBuddyGender.isEmpty()) {
                for(Korean korean : koreanBuddyGenderAndNation) {
                    Integer count = interestRepository.countByInterest(member.getMemberId(), korean.getMember().getMemberId());
                    if(count > 0) {
                        Buddy buddy = Buddy.builder()
                                .korean(korean)
                                .foreigner(foreigner).build();
                        return buddyRepository.save(buddy).getBuddyId();
                    }
                }

                Buddy buddy = Buddy.builder()
                        .korean(koreanBuddyGenderAndNation.get(0))
                        .foreigner(foreigner).build();
                return buddyRepository.save(buddy).getBuddyId();
            }

        }
        else { // 한국인이면
            // 1순위: 성별 & 국적, 관심사(무관)
            Korean korean = koreanRepository.findByMember(member)
                    .orElseThrow(() -> new NotFoundException("Not Found Korean"));

            List<Foreigner> foreignerBuddyGenderAndNation = memberRepository.findForeignerBuddyGenderAndNation(member.getMemberId());
            if(!foreignerBuddyGenderAndNation.isEmpty()) {
                for(Foreigner foreigner : foreignerBuddyGenderAndNation) {
                    Integer count = interestRepository.countByInterest(member.getMemberId(), foreigner.getMember().getMemberId());
                    if(count > 0) {
                        Buddy buddy = Buddy.builder()
                                .korean(korean)
                                .foreigner(foreigner).build();
                        return buddyRepository.save(buddy).getBuddyId();
                    }
                }

                Buddy buddy = Buddy.builder()
                        .korean(korean)
                        .foreigner(foreignerBuddyGenderAndNation.get(0)).build();
                return buddyRepository.save(buddy).getBuddyId();
            }

            // 2순위: 성별, 관심사(무관)
            List<Foreigner> foreignerBuddyGender = memberRepository.findForeignerBuddyGender(member.getMemberId());
            if(!foreignerBuddyGender.isEmpty()) {
                for(Foreigner foreigner : foreignerBuddyGender) {
                    Integer count = interestRepository.countByInterest(member.getMemberId(), foreigner.getMember().getMemberId());
                    if(count > 0) {
                        Buddy buddy = Buddy.builder()
                                .korean(korean)
                                .foreigner(foreigner).build();
                        return buddyRepository.save(buddy).getBuddyId();
                    }
                }

                Buddy buddy = Buddy.builder()
                        .korean(korean)
                        .foreigner(foreignerBuddyGenderAndNation.get(0)).build();
                return buddyRepository.save(buddy).getBuddyId();
            }
        }
        return null;
    }

    @Override
    @Transactional
    public Integer deleteBuddy(Long memberId) {
        Member member = memberService.findMember(memberId);

        if(member.getMemberIsForeigner()) {
            Foreigner foreigner = foreignerRepository.findByMember(member)
                    .orElseThrow(() -> new NotFoundException("Not Found Foreigner"));
            return buddyRepository.deleteByForeigner(foreigner);
        }
        else {
            Korean korean = koreanRepository.findByMember(member)
                    .orElseThrow(() -> new NotFoundException("Not Found Korean"));
            return buddyRepository.deleteByKorean(korean);
        }
    }
}
