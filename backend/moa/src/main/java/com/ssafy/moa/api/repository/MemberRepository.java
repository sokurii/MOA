package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.Member;
import com.ssafy.moa.api.repository.querydsl.MemberQueryRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>, MemberQueryRepository {

    Optional<Member> findByMemberEmail(String memberEmail);
    Optional<Member> findByMemberId(Long memberId);

    Boolean existsByMemberEmail(String memberEmail);
}
