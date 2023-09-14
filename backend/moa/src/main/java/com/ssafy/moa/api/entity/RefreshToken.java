package com.ssafy.moa.api.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(timeToLive = 604800)
@Getter
@ToString
public class RefreshToken {

    @Id
    private String memberEmail;
    private String refreshToken;

    @Builder
    public RefreshToken(String refreshToken, String memberEmail) {
        this.refreshToken = refreshToken;
        this.memberEmail = memberEmail;
    }


}
