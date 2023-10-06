package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.DailyKoreanQuiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface DailyKoreanQuizRepository extends JpaRepository<DailyKoreanQuiz, Long> {
    Optional<DailyKoreanQuiz> findByQuizId(Long quizId);
}
