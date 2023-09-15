package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "level")
public class Level {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long levelId;

    @NotNull
    private Integer requiredExp;

    @NotNull
    @Column(length = 10)
    private String levelName;

    @NotNull
    private Integer levelGrade;

    @OneToMany(mappedBy = "memberLevel")
    private List<Member> memberList;

    @Override
    public String toString() {
        return "Level{" +
                "levelId=" + levelId +
                ", requiredExp=" + requiredExp +
                ", levelName='" + levelName + '\'' +
                ", levelGrade=" + levelGrade +
                '}';
    }
}
