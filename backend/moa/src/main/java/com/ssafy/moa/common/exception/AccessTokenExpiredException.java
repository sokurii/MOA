package com.ssafy.moa.common.exception;


public class AccessTokenExpiredException extends RuntimeException {
    public AccessTokenExpiredException(String message) {
        super(message);
    }

    public AccessTokenExpiredException(String message, Throwable cause) {
        super(message, cause);
    }
}
