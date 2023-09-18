package com.ssafy.moa.api.repository;

import com.ssafy.moa.api.entity.RefreshToken;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.repository.CrudRepository;

@RedisHash
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {
}
