package com.ssafy.moa.common.handler;

import com.ssafy.moa.common.exception.NotFoundException;
import com.ssafy.moa.common.utils.ApiUtils;
import jakarta.validation.ConstraintViolationException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;


import static com.ssafy.moa.common.utils.ApiUtils.error;
import static com.ssafy.moa.common.utils.ApiUtils.success;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
            NoHandlerFoundException.class,
            NotFoundException.class,
            Exception.class
    })
    public ResponseEntity<ApiUtils.ApiResult<?>> handleNotFoundException(Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error(e, HttpStatus.NOT_FOUND));
    }
}