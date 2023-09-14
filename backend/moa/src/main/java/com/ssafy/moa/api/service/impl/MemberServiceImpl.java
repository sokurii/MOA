package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.entity.RefreshToken;
import com.ssafy.moa.api.jwt.JwtTokenProvider;
import com.ssafy.moa.api.jwt.MyUserDetailsService;
import com.ssafy.moa.api.repository.MemberRepository;
import com.ssafy.moa.api.repository.RefreshTokenRepository;
import com.ssafy.moa.api.service.MemberService;
import com.ssafy.moa.dto.LoginReqDto;
import com.ssafy.moa.dto.MemberSignUpDto;
import com.ssafy.moa.dto.TokenRespDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;

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
        String memberName = memberSignUpReqDto.getMemberName();
        Integer memberGender = memberSignUpReqDto.getMemberGender();
        Boolean memberIsForeigner = memberSignUpReqDto.getMemberIsForeigner();

        Member member = new Member(memberEmail, encodedPassword, memberName, memberGender, memberIsForeigner, 0);
        memberRepository.save(member);
        return new MemberSignUpDto(member);
    }

    @Override
    @Transactional
    public TokenRespDto login(LoginReqDto loginReqDto) {
        UserDetails userDetails = myUserDetailsService.loadUserByUsername(loginReqDto.getMemberEmail());

        if(!passwordEncoder.matches(loginReqDto.getMemberPassword(), userDetails.getPassword())) {
            throw new BadCredentialsException(userDetails.getUsername() + "Invalid Password");
        }

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userDetails.getUsername(), userDetails.getPassword(), userDetails.getAuthorities()
        );

        return new TokenRespDto(
                "Bearer " + jwtTokenProvider.createAccessToken(authentication),
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
}
