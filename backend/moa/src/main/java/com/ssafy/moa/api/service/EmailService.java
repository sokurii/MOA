package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.member.EmailCheckDto;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.io.UnsupportedEncodingException;

public interface EmailService {

    MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException;
    String sendSimpleMessage(EmailCheckDto emailCheckDto) throws Exception;


}
