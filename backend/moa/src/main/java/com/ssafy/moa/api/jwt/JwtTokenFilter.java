package com.ssafy.moa.api.jwt;

import com.ssafy.moa.api.repository.MemberRepository;
import com.ssafy.moa.common.exception.AccessTokenExpiredException;
import com.ssafy.moa.common.exception.InvalidTokenException;
import com.ssafy.moa.common.exception.RefreshTokenExpiredException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
public class JwtTokenFilter extends OncePerRequestFilter {

    // 현재는 refreshToken을 Header에 담아서 보내주고 있지만,
    // refreshToken은 쿠키에 저장하여 관리하는 것이 안전하기 때문에 FrontEnd에서 쿠키를 저장하는 로직을 구현한 후
    // refreshToken을 쿠키에 저장하는 방식으로 리팩토링할 예정.

    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String REFRESH_HEADER = "Refresh";

    private JwtTokenProvider jwtTokenProvider;

    public JwtTokenFilter(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = resolveToken(request, AUTHORIZATION_HEADER);

        if(jwt != null && jwtTokenProvider.validateToken(jwt) == JwtTokenProvider.JwtCode.ACCESS) {
            Authentication authentication = jwtTokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("set Authentication to security context for '{}', uri: {}", authentication.getName(), request.getRequestURI());
        }
        // accessToken이 만료되었을 때
        else if(jwt != null && jwtTokenProvider.validateToken(jwt) == JwtTokenProvider.JwtCode.EXPIRED) {
            log.info("accessToken has expired.");
            String refresh = resolveToken(request, REFRESH_HEADER);
            // refreshToken 만료 여부를 확인해서 만약 만료되지 않은 refreshToken일 경우 재발급해준다.
            if(refresh != null && jwtTokenProvider.validateToken(refresh) == JwtTokenProvider.JwtCode.ACCESS) {
                response.setHeader(REFRESH_HEADER, "Bearer " + refresh);

                // accessToken 생성
                Authentication authentication = jwtTokenProvider.getAuthentication(refresh);
                String newAccessToken = jwtTokenProvider.createAccessToken(authentication, jwtTokenProvider.extractMemberId(refresh));
                response.setHeader(AUTHORIZATION_HEADER, "Bearer " + newAccessToken);

                SecurityContextHolder.getContext().setAuthentication(authentication);
                log.info("Issued a new accessToken through refreshToken.");
                // 만료된 AccessToken 처리, AccessToken 만료되었음을 클라이언트에게 알리기.
                throw new AccessTokenExpiredException("accessTokenExpired");
            }
            // 유효하지 않은 refreshToken을 입력받았을 때
            // 이때는 accessToken, refreshToken을 재발급 X
            else if(jwtTokenProvider.validateToken(refresh) == JwtTokenProvider.JwtCode.DENIED) {
                throw new InvalidTokenException("invalidRefreshToken");
            }
            else if(jwtTokenProvider.validateToken(refresh) == JwtTokenProvider.JwtCode.EXPIRED) {
                log.info("refreshToken이 만료되었어요. 로그아웃 처리가 필요합니다.");
                throw new RefreshTokenExpiredException("refreshTokenExpired");
            }
        }
        // 입력받은 accessToken이 valid하지 않을 때
        else if(jwt != null && jwtTokenProvider.validateToken(jwt) == JwtTokenProvider.JwtCode.DENIED){
            log.info("no valid JWT token found, uri: {}", request.getRequestURI());
            throw new InvalidTokenException("invalidAccessToken");
        }
        filterChain.doFilter(request, response);
    }

    private String resolveToken(HttpServletRequest request, String header) {
        String bearerToken = request.getHeader(header);
        if(bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}
