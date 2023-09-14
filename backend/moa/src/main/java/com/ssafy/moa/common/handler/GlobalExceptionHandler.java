package com.ssafy.moa.common.handler;

import com.ssafy.moa.common.exception.NotFoundException;
import com.ssafy.moa.common.utils.ApiUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;


import static com.ssafy.moa.common.utils.ApiUtils.error;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
            NoHandlerFoundException.class,
            NotFoundException.class,
    })
    public ApiUtils.ApiResult<?> handleNotFoundException(Exception e) {

        return error(e, HttpStatus.NOT_FOUND);
    }
}