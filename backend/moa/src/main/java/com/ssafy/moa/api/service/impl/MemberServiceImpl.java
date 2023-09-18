package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.entity.*;
import com.ssafy.moa.api.jwt.JwtTokenProvider;
import com.ssafy.moa.api.jwt.MyUserDetailsService;
import com.ssafy.moa.api.repository.*;
import com.ssafy.moa.api.service.MemberService;
import com.ssafy.moa.api.dto.member.LoginReqDto;
import com.ssafy.moa.api.dto.member.MemberSignUpDto;
import com.ssafy.moa.api.dto.member.TokenRespDto;
import com.ssafy.moa.common.exception.EmailDuplicateException;
import com.ssafy.moa.common.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final NationRepository nationRepository;
    private final ForeignerRepository foreignerRepository;
    private final LevelRepository levelRepository;

    private final PasswordEncoder passwordEncoder;
    private final MyUserDetailsService myUserDetailsService;
    private final JwtTokenProvider jwtTokenProvider;

    // 회원가입 구현
    @Override
    @Transactional
    public MemberSignUpDto signUp(MemberSignUpDto memberSignUpReqDto) {
        // 중복체크 나중에 ..

        String encodedPassword = passwordEncoder.encode(memberSignUpReqDto.getMemberPassword());

        String memberEmail = memberSignUpReqDto.getMemberEmail();
        if(memberRepository.existsByMemberEmail(memberEmail)) {
            throw new EmailDuplicateException("중복된 이메일을 입력하였습니다.");
        }

        String memberName = memberSignUpReqDto.getMemberName();
        Integer memberGender = memberSignUpReqDto.getMemberGender();
        Boolean memberIsForeigner = memberSignUpReqDto.getMemberIsForeigner();

        // default Level
        Level defaultLevel = levelRepository.findByLevelId(1L)
                .orElseThrow(() -> new NotFoundException("해당 ID를 가진 Level를 찾지 못했습니다."));

        Member member = new Member(memberEmail, encodedPassword, memberName, memberGender, memberIsForeigner, 0, defaultLevel);
        memberRepository.save(member);

        // 유학생일 경우 유학생 테이블에도 정보 추가해주기
        if(memberIsForeigner) {
            // 나라 정보 찾기
            String nationName = memberSignUpReqDto.getNationName();
            NationCode nationCode = nationRepository.findByNationName(nationName)
                    .orElseThrow(() -> new NotFoundException("Not Found Nation Name : " + nationName));
            Foreigner newForeigner = new Foreigner(member, nationCode);
            foreignerRepository.save(newForeigner);
        }


        return new MemberSignUpDto(member);
    }

    @Override
    @Transactional
    public TokenRespDto login(LoginReqDto loginReqDto) {
        UserDetails userDetails = myUserDetailsService.loadUserByUsername(loginReqDto.getMemberEmail());

        // memberId도 토큰을 만들 때 사용하기 위해서
        Member member = memberRepository.findByMemberEmail(loginReqDto.getMemberEmail())
                .orElseThrow(() -> new NotFoundException(loginReqDto.getMemberEmail() + "의 이메일을 가진 사용자가 없습니다."));

        if(!passwordEncoder.matches(loginReqDto.getMemberPassword(), userDetails.getPassword())) {
            throw new BadCredentialsException(userDetails.getUsername() + "Invalid Password");
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails.getUsername(), userDetails.getPassword(), userDetails.getAuthorities()
        );


        return new TokenRespDto(
                "Bearer " + jwtTokenProvider.createAccessToken(authentication, member.getMemberId()),
                "Bearer " + jwtTokenProvider.issueRefreshToken(authentication)
        );
    }

    @Override
    // 로그아웃
    public void logout(Authentication authentication) {
        String memberEmail = authentication.getName();

        Optional<RefreshToken> findRefreshToken = refreshTokenRepository.findById(memberEmail);
        if(findRefreshToken.isPresent()) {
            refreshTokenRepository.delete(findRefreshToken.get());
        }
    }

    // 회원 탈퇴
    @Override
    public String removeMember(Long memberId) {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new NotFoundException(memberId + "에 해당하는 member를 찾지 못했습니다."));

        memberRepository.delete(member);
        return "탈퇴 성공";
    }
}
