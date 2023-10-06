package com.ssafy.moa.api.jwt;

import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class MyUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = memberRepository.findByMemberEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("memberEmail이 " +username + "인 member가 존재하지 않습니다."));
        return createUserDetails(member);
    }

    private UserDetails createUserDetails(Member member) {
        return new User(member.getMemberEmail(), member.getMemberPassword(), new ArrayList<>());
    }
}
