package com.ssafy.moa.api.entity;

import com.ssafy.moa.api.entity.key.KoreanKey;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Korean {

    @EmbeddedId
    private KoreanKey koreanKey;
}
