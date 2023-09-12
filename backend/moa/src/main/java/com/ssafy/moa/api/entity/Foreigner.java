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
    private int foreignerLikeGender;

    public void update(int foreignerLikeGender) {
        this.foreignerLikeGender = foreignerLikeGender;
    }

    @Override
    public String toString() {
        return "Foreigner{" +
                "foreignerKey=" + foreignerKey +
                ", foreignerKoreaName='" + foreignerKoreaName + '\'' +
                ", foreignerLikeGender='" + foreignerLikeGender + '\'' +
                '}';
    }
}
