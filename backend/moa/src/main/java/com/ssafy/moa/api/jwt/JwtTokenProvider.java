package com.ssafy.moa.api.jwt;

import com.ssafy.moa.api.entity.RefreshToken;
import com.ssafy.moa.api.repository.RefreshTokenRepository;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.security.Key;
import java.util.*;

@Component
@Slf4j
public class JwtTokenProvider implements InitializingBean {

    private final MyUserDetailsService myUserDetailsService;
    private final RefreshTokenRepository refreshTokenRepository;

    private final String secretKey;
    private final long tokenValidityInMs;
    private final long refreshTokenValidityInMs;

    public JwtTokenProvider(@Value("${jwt.secret-key}") String secretKey,
                            @Value("${jwt.token-validity-in-sec}") long tokenValidity,
                            @Value("${jwt.refresh-token-validity-in-sec}") long refreshTokenValidityInMs,
                            MyUserDetailsService myUserDetailsService,
                            RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.myUserDetailsService = myUserDetailsService;
        this.secretKey = secretKey;
        this.tokenValidityInMs = tokenValidity * 1000;
        this.refreshTokenValidityInMs = refreshTokenValidityInMs * 1000;
    }

    private Key key;

    @Override
    public void afterPropertiesSet() throws Exception {
        String encodedKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
        key = Keys.hmacShaKeyFor(encodedKey.getBytes());
    }

    // accessToken 생성
    public String createAccessToken(Authentication authentication) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + tokenValidityInMs);

        return  Jwts.builder()
                .setSubject(authentication.getName())
                .setIssuedAt(now)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        UserDetails userDetails = myUserDetailsService.loadUserByUsername(claims.getSubject());
        return new UsernamePasswordAuthenticationToken(userDetails, token, userDetails.getAuthorities());
    }

    public JwtCode validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return JwtCode.ACCESS;
        } catch (ExpiredJwtException e) {
            // 만료된 경우에는 refresh Token 확인
            return JwtCode.EXPIRED;
        } catch (JwtException | IllegalArgumentException e) {
            log.info("jwtException: " +  e);
        }
        return JwtCode.DENIED;
    }

    @Transactional
    public String reissueRefreshToken(String refreshToken) throws RuntimeException  {
        // 현재 받은 refreshToken을 DB의 refreshToken과 비교하기
       Authentication authentication = getAuthentication(refreshToken);

       // Redis에서 해당 멤버의 RefreshToken을 가져온다.
        RefreshToken findRefreshToken = refreshTokenRepository.findById(authentication.getName())
                .orElseThrow(() -> new UsernameNotFoundException("memberEmail이 " + authentication.getName() + "인 refreshToken은 존재하지 않습니다."));

        if(findRefreshToken.getRefreshToken().equals(refreshToken)) {
            // 새로운 RefreshToken 생성
            String newRefreshToken = createRefreshToken(authentication);
            refreshTokenRepository.save(new RefreshToken(newRefreshToken, authentication.getName()));
            return newRefreshToken;
        }
        else {
            log.info("refreshToken이 일치하지 않습니다.");
            return null;
        }

    }


    @Transactional
    public String issueRefreshToken(Authentication authentication) {
        String newRefreshToken = createRefreshToken(authentication);

        // Redis에 RefreshToken 저장
        refreshTokenRepository.save(new RefreshToken(newRefreshToken, authentication.getName()));
        return newRefreshToken;
    }

    // refreshToken 생성
    private String createRefreshToken(Authentication authentication) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + refreshTokenValidityInMs);

        return Jwts.builder()
                .setSubject(authentication.getName())
                .setIssuedAt(now)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(validity)
                .compact();
    }


    public static enum JwtCode {
        DENIED,
        ACCESS,
        EXPIRED;
    }



}
