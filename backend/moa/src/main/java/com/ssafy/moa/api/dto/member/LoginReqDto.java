package com.ssafy.moa.api.dto.member;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginReqDto {
    private String memberEmail;
    private String memberPassword;
}
