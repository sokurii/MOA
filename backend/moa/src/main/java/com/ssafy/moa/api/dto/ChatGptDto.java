package com.ssafy.moa.api.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatGptDto {
    @NotNull
    private String question;
}
