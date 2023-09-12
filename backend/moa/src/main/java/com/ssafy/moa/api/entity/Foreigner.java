package com.ssafy.moa.api.entity;

import com.ssafy.moa.api.entity.key.ForeignerKey;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Foreigner {

    @EmbeddedId
    private ForeignerKey foreignerKey;
    @Column(length = 100)
    private String foreignerKoreaName;
}
