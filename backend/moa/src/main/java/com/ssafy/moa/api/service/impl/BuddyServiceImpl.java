package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.BuddyDto.*;
import com.ssafy.moa.api.entity.*;
import com.ssafy.moa.api.repository.*;
import com.ssafy.moa.api.service.BuddyService;
import com.ssafy.moa.api.service.MemberService;
import com.ssafy.moa.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

@Slf4j
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
    public Long saveKoreanBuddyInfo(Member member, KoreanBuddyPostRequest buddyKoreanPostRequest) {
        NationCode nationCode = nationRepository.findByNationCode(buddyKoreanPostRequest.getNationCode())
                .orElseThrow(() -> new NotFoundException("Not Found Nation Code"));

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
    public Long saveForeignerBuddyInfo(Long memberId,  ForeignerBuddyPostRequest foreignerBuddyPostRequest) {
        Member member = memberService.findMember(memberId);
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
    public Long findMatchingBuddy(Long memberId) {
        // memberId로 외국인인지 판별
        Member member = memberService.findMember(memberId);

        // 외국인이면
        if(member.getMemberIsForeigner()) {
            log.info("foreigner");
            Foreigner foreigner = foreignerRepository.findByMember(member)
                    .orElseThrow(() -> new NotFoundException("Not Found Foreigner"));

            List<Korean> koreanBuddyGenderAndNation = memberRepository.findKoreanBuddyGenderAndNation(member.getMemberId());
            if(!koreanBuddyGenderAndNation.isEmpty()) {
                for(Korean korean : koreanBuddyGenderAndNation) {
                    Integer count = interestRepository.countByInterest(member.getMemberId(), korean.getMember().getMemberId());
                    if(count > 0) {
                        Buddy buddy = Buddy.builder()
                                .korean(korean)
                                .foreigner(foreigner)
                                .createdAt(LocalDate.now()).build();
                        return buddyRepository.save(buddy).getBuddyId();
                    }
                    else {
                        Buddy buddy = Buddy.builder()
                                .korean(koreanBuddyGenderAndNation.get(0))
                                .foreigner(foreigner)
                                .createdAt(LocalDate.now()).build();
                        return buddyRepository.save(buddy).getBuddyId();
                    }
                }
            }

            // 2순위: 성별, 관심사(무관)
            List<Korean> koreanBuddyGender = memberRepository.findKoreanBuddyGender(member.getMemberId());
            log.info(String.valueOf(koreanBuddyGender.size()));
            log.info(String.valueOf(koreanBuddyGender.get(0).getKoreanId()));

            if(!koreanBuddyGender.isEmpty()) {
                for(Korean korean : koreanBuddyGender) {
                    Integer count = interestRepository.countByInterest(member.getMemberId(), korean.getMember().getMemberId());
                    if(count > 0) {
                        Buddy buddy = Buddy.builder()
                                .korean(korean)
                                .foreigner(foreigner)
                                .createdAt(LocalDate.now()).build();
                        return buddyRepository.save(buddy).getBuddyId();
                    }
                    else {
                        Buddy buddy = Buddy.builder()
                                .korean(korean)
                                .foreigner(foreigner)
                                .createdAt(LocalDate.now()).build();
                        return buddyRepository.save(buddy).getBuddyId();
                    }
                }
            }
        }
        else { // 한국인이면
            // 1순위: 성별 & 국적, 관심사(무관)
            log.info("korean");
            Korean korean = koreanRepository.findByMember(member)
                    .orElseThrow(() -> new NotFoundException("Not Found Korean"));

            List<Foreigner> foreignerBuddyGenderAndNation = memberRepository.findForeignerBuddyGenderAndNation(member.getMemberId());
            if(!foreignerBuddyGenderAndNation.isEmpty()) {
                for(Foreigner foreigner : foreignerBuddyGenderAndNation) {
                    Integer count = interestRepository.countByInterest(member.getMemberId(), foreigner.getMember().getMemberId());
                    log.info(String.valueOf(count));
                    if(count > 0) {
                        Buddy buddy = Buddy.builder()
                                .korean(korean)
                                .foreigner(foreigner)
                                .createdAt(LocalDate.now()).build();
                        return buddyRepository.save(buddy).getBuddyId();
                    }
                }
                Buddy buddy = Buddy.builder()
                        .korean(korean)
                        .foreigner(foreignerBuddyGenderAndNation.get(0))
                        .createdAt(LocalDate.now()).build();
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

    @Override
    @Transactional(readOnly = true)
    public Long findWithBuddyDate(Long memberId) {
        Member member = memberService.findMember(memberId);
        LocalDate agoDate = null;
        if(member.getMemberIsForeigner()) { // 외국인이면
            Foreigner foreigner = member.getForeigner();
            Buddy buddy = buddyRepository.findByForeigner(foreigner).get();
            agoDate = buddy.getCreatedAt();
        }
        else {
            Korean korean = member.getKorean();
            Buddy buddy = buddyRepository.findByKorean(korean).get();
            agoDate = buddy.getCreatedAt();
        }
        Long daysDifference = ChronoUnit.DAYS.between(agoDate, LocalDate.now());
        return daysDifference;
    }

    @Override
    @Transactional(readOnly = true)
    public Long findBuddy(Member member) {
        if(member.getMemberIsForeigner()) {
            Foreigner foreigner = foreignerRepository.findByMember(member)
                    .orElseThrow(() -> new NotFoundException("Not Found Foreigner"));
            Optional<Buddy> buddy = buddyRepository.findByForeigner(foreigner);
            if(!buddy.isPresent()) return 0L;
            return buddy.get().getBuddyId();
        }
        else {
            Optional<Korean> korean = koreanRepository.findByMember(member);
            if(!korean.isPresent()) return 0L;

            Optional<Buddy> buddy = buddyRepository.findByKorean(korean.get());
            if(!buddy.isPresent()) return 0L;
            return buddy.get().getBuddyId();
        }
    }
}
