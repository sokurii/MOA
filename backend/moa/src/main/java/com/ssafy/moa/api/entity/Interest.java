package com.ssafy.moa.api.entity;

import com.ssafy.moa.api.entity.key.InterestKey;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "interest")
@NoArgsConstructor
public class Interest {
    @EmbeddedId
    private InterestKey interestKey;
}
