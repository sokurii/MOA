package com.ssafy.moa.api.dto.member;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EmailDuplicateCheckDto {

    private String emailMessage;
    private Boolean isEmailDuplicate;

    @Builder
    public EmailDuplicateCheckDto(String emailMessage, Boolean isEmailDuplicate) {
        this.emailMessage = emailMessage;
        this.isEmailDuplicate = isEmailDuplicate;
    }

    @Override
    public String toString() {
        return "EmailDuplicateCheckDto{" +
                "emailMessage='" + emailMessage + '\'' +
                ", isEmailDuplicate=" + isEmailDuplicate +
                '}';
    }
}
