package com.ssafy.moa.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "nation_code")
@NoArgsConstructor
public class NationCode {

    @Id
    private int nationCode;

    @Column(length = 30)
    private String nationName;
}
