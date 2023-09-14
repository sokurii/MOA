package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@Table(name = "interest_code")
@NoArgsConstructor
public class InterestCode {
    @Id
    @Column(name = "interest_code")
    private int interestCode;
    private String interestName;

    @OneToMany(mappedBy = "interestCode")
    private List<Interest> interest;
}
