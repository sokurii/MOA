package com.ssafy.moa.common.exception;

public class EmailDuplicateException extends RuntimeException{

    public EmailDuplicateException(String message) {
        super(message);
    }

    public EmailDuplicateException(String message, Throwable cause) {
        super(message, cause);
    }
}
