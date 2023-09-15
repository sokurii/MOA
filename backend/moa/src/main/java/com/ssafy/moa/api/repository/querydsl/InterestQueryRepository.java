package com.ssafy.moa.api.repository.querydsl;

public interface InterestQueryRepository {
    Integer countByInterest(Long koreanId, Long foreignId);
}
