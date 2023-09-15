package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@Table(name = "nation_code")
@NoArgsConstructor
public class NationCode {

    @Id
    @Column(name = "nation_code")
    private int nationCode;

    @Column(length = 30)
    private String nationName;

    @OneToMany(mappedBy = "nationCode", cascade = CascadeType.ALL)
    private List<Foreigner> foreigner;

    @OneToMany(mappedBy = "nationCode", cascade = CascadeType.ALL)
    private List<Korean> korean;

    @Override
    public String toString() {
        return "NationCode{" +
                "nationCode=" + nationCode +
                ", nationName='" + nationName + '\'' +
                '}';
    }
}
