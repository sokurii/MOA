package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.Word;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface WordRepository extends JpaRepository<Word, Long> {
    List<Word> findByMember_MemberIdOrderByCreatedAtDesc(Long memberId);
    Long deleteByWordId(Long wordId);
    List<Word> findByMember_MemberIdAndWordName(Long memberId, String wordName);
}
