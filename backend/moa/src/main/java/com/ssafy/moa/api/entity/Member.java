package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "member")
public class Member {

    @Id
    @Column(name = "member_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @NotNull
    private String memberEmail;

    @NotNull
    @Column(length = 100)
    private String memberPassword;

    @NotNull
    @Column(length = 100)
    private String memberName;

    @NotNull
    private Integer memberGender;

    @NotNull
    private Boolean memberIsForeigner;

    @NotNull
    @Column(columnDefinition = "INT DEFAULT 0")
    private Integer memberExp;

    @OneToMany(mappedBy = "member")
    private List<Interest> interest;

    @OneToMany(mappedBy = "member")
    private List<Foreigner> foreigner;

    @OneToMany(mappedBy = "member")
    private List<Korean> korean;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;


    @Builder
    public Member(String memberEmail, String memberPassword, String memberName, Integer memberGender, Boolean memberIsForeigner, Integer memberExp) {
        this.memberEmail = memberEmail;
        this.memberPassword = memberPassword;
        this.memberName = memberName;
        this.memberGender = memberGender;
        this.memberIsForeigner = memberIsForeigner;
        this.memberExp = memberExp;
    }

    @Override
    public String toString() {
        return "Member{" +
                "memberId=" + memberId +
                ", memberEmail='" + memberEmail + '\'' +
                ", memberPassword='" + memberPassword + '\'' +
                ", memberName='" + memberName + '\'' +
                ", memberGender=" + memberGender +
                ", memberIsForeigner=" + memberIsForeigner +
                ", memberExp=" + memberExp +
                '}';
    }
}
