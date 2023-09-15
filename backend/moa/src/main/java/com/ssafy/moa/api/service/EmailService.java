package com.ssafy.moa.api.service;

import com.ssafy.moa.api.dto.member.EmailCheckDto;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Random;

@PropertySource("classpath:application.yml")
@Slf4j
@RequiredArgsConstructor
@Service
public class EmailService {
    private final JavaMailSender javaMailSender;

    // 인증번호 생성
    private final String ePw = createKey();

    @Value("${spring.mail.username}")
    private String id;

    public MimeMessage createMessage(String to) throws MessagingException, UnsupportedEncodingException {
        MimeMessage message = javaMailSender.createMimeMessage();

        message.addRecipients(MimeMessage.RecipientType.TO, to); //  보내는 대상
        message.setSubject("MOA 회원가입 인증 코드입니다.");

        // 메일 내용
        // 메일 내용 메일의 subtype을 html로 지정하여 html문법 사용 가능
        String msg = "";
        msg += "<h1 style=\"font-size: 30px; padding-right: 30px; padding-left: 30px;\">이메일 인증 코드 발급</h1>";
        msg += "<p style=\"font-size: 17px; padding-right: 30px; padding-left: 30px;\">아래 확인 코드를 회원가입 화면에서 입력해주세요.</p>";
        msg += "<div style=\"padding-right: 30px; padding-left: 30px; margin: 32px 0 40px;\"><table style=\"border-collapse: collapse; border: 0; background-color: #F4F4F4; height: 70px; table-layout: fixed; word-wrap: break-word; border-radius: 6px;\"><tbody><tr><td style=\"text-align: center; vertical-align: middle; font-size: 30px;\">";
        msg += ePw;
        msg += "</td></tr></tbody></table></div>";

        message.setText(msg, "utf-8", "html");
        message.setFrom(new InternetAddress(id, "MOA"));

        return message;
    }

    // 인증번호 만들기
    private  static String createKey() {
        StringBuffer key = new StringBuffer();
        Random random = new Random();

        for(int i = 0; i < 6; i++) {
            key.append((random.nextInt(10)));
        }
        return key.toString();
    }

    // 메일 발송
    public String sendSimpleMessage(EmailCheckDto emailCheckDto) throws Exception {
        MimeMessage message = createMessage(emailCheckDto.getEmail());
        try {
            javaMailSender.send(message);
        } catch (MailException e) {
            e.printStackTrace();
            throw new IllegalAccessException();
        }
        return ePw;
    }

}
