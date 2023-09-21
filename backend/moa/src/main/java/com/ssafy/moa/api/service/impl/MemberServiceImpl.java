package com.ssafy.moa.api.service.impl;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.ssafy.moa.api.dto.member.*;
import com.ssafy.moa.api.entity.*;
import com.ssafy.moa.api.jwt.JwtTokenProvider;
import com.ssafy.moa.api.jwt.MyUserDetailsService;
import com.ssafy.moa.api.repository.*;
import com.ssafy.moa.api.repository.querydsl.MemberQueryRepository;
import com.ssafy.moa.api.service.MemberService;
import com.ssafy.moa.common.exception.EmailDuplicateException;
import com.ssafy.moa.common.exception.NotFoundException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberServiceImpl implements MemberService {

    private final String bucketName = "diary_storage";
    private final Storage storage;
    private final String url = "https://storage.googleapis.com/";

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

        Member member = Member.builder()
                .memberEmail(memberEmail)
                .memberPassword(encodedPassword)
                .memberName(memberName)
                .memberGender(memberGender)
                .memberIsForeigner(memberIsForeigner)
                .memberExp(0)
                .memberLevel(defaultLevel)
                .memberImgAddress("https://storage.googleapis.com/diary_storage/member/default.jpg")
                .build();

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
    public TokenRespDto login(LoginReqDto loginReqDto, HttpServletResponse response) {
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

        String refreshToken = jwtTokenProvider.issueRefreshToken(authentication, member.getMemberId());

        // 쿠키 생성
        String cookieName = "refreshToken";
        String cookieValue = refreshToken;

        Cookie cookie = new Cookie(cookieName, cookieValue);
        cookie.setMaxAge(60 * 60 * 24 * 14);
        cookie.setPath("/");

        response.addCookie(cookie);

        return new TokenRespDto(
                "Bearer " + jwtTokenProvider.createAccessToken(authentication, member.getMemberId()),
                "Bearer " + refreshToken
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

    @Override
    public Member findMember(Long memberId) {
        return memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new NotFoundException("Not Found User"));
    }

    // 회원 프로필 사진 수정
    @Override
    @Transactional(rollbackFor = Exception.class)
    public MemberPhotoDto updateMemberPhoto(Long memberId, MultipartFile multipartFile) throws IOException {
        Member member = memberRepository.findByMemberId(memberId)
                .orElseThrow(() -> new NotFoundException(memberId + "에 해당하는 Member를 찾을 수 없습니다."));

        String uuid = UUID.randomUUID().toString();
        String ext = multipartFile.getContentType();

        BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, "member/" + uuid)
                .setContentType(ext)
                .build();
        storage.create(blobInfo, multipartFile.getInputStream());

        String updateMemberImgAddress = url + bucketName + "/member/" + uuid;
        member.updateMemberImgAddress(updateMemberImgAddress);
        memberRepository.save(member);

        return MemberPhotoDto.builder()
                .memberImgAddress(updateMemberImgAddress)
                .build();
    }

    // 회원 정보 조회
    @Override
    public MemberInfoDto getMemberInfo(Long memberId) {
        return memberRepository.getMemberInfoWithLevel(memberId);
    }


}
