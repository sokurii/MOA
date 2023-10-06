package com.ssafy.moa.api.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.moa.common.exception.AccessTokenExpiredException;
import com.ssafy.moa.common.exception.InvalidTokenException;
import com.ssafy.moa.common.exception.RefreshTokenExpiredException;
import com.ssafy.moa.common.utils.ApiUtils;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import static com.ssafy.moa.common.utils.ApiUtils.error;
@Slf4j
@RequiredArgsConstructor
@Component
public class JwtExceptionFilter extends OncePerRequestFilter {


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        response.setCharacterEncoding("utf-8");

        try{
            filterChain.doFilter(request, response);
        } catch (AccessTokenExpiredException | InvalidTokenException | RefreshTokenExpiredException e) {
            setErrorResponse(HttpStatus.UNAUTHORIZED ,response, e);
        }
    }

    public void setErrorResponse(HttpStatus status, HttpServletResponse response, Throwable e) throws IOException {
       ApiResult<?> errorResponse = ApiUtils.error(e, status);
       response.setContentType("application/json;charset=UTF-8");
       response.setStatus(status.value());
       response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
    }

//    public void setErrorResposne(HttpStatus status, HttpServletResponse response, Throwable ex) throws IOException {
//        response.setContentType("application/json;charset=UTF-8");
//        response.setStatus(status.value());
//
//        JSONObject responseJson = new JSONObject();
//        responseJson.put("message", ex.getMessage());
//        responseJson.put("status", status.value());
//
//        response.getWriter().print(responseJson);
//    }
}
