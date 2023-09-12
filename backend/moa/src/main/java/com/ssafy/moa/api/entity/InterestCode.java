package com.ssafy.moa.api.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "interest_code")
@NoArgsConstructor
public class InterestCode {
    @Id
    private int interestCode;
    private String interestName;
}
