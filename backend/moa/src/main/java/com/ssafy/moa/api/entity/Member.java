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

    @NotNull
    @Column(columnDefinition = "VARCHAR(255) DEFAULT 'https://storage.googleapis.com/diary_storage/member/default.jpg'")
    private String memberImgAddress;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<Interest> interest;

    @OneToOne(mappedBy = "member")
    private Foreigner foreigner;

    @OneToOne(mappedBy = "member")
    private Korean korean;

    @OneToMany(mappedBy = "member")
    private List<BalanceGame> balanceGame;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL)
    private List<BalanceGameGood> balanceGameGood;

    @OneToMany(mappedBy = "member")
    private List<ExchangeDiary> exchangeDiary;

    @OneToMany(mappedBy = "member")
    private List<OpenChat> openChat;

    @OneToMany(mappedBy = "member")
    private List<OpenChatMember> openChatMember;

    @OneToMany(mappedBy = "member")
    private List<Article> article;

    @OneToMany(mappedBy = "member")
    private List<Word> word;

    @ManyToOne
    @NotNull
    @JoinColumn(name = "member_level")
    private Level memberLevel;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;


    @Builder
    public Member(String memberEmail, String memberPassword, String memberName, Integer memberGender, Boolean memberIsForeigner,
                  Integer memberExp, Level memberLevel, String memberImgAddress,
                  LocalDateTime createdAt, LocalDateTime modifiedAt) {
        this.memberEmail = memberEmail;
        this.memberPassword = memberPassword;
        this.memberName = memberName;
        this.memberGender = memberGender;
        this.memberIsForeigner = memberIsForeigner;
        this.memberExp = memberExp;
        this.memberLevel = memberLevel;
        this.memberImgAddress = memberImgAddress;
        this.createdAt = createdAt;
        this.modifiedAt = modifiedAt;
    }

    public void updateMemberImgAddress(String memberImgAddress) {
        this.memberImgAddress = memberImgAddress;
    }

    @PreUpdate
    public void preUpdate() {
        this.modifiedAt = LocalDateTime.now();
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
                ", memberImgAddress='" + memberImgAddress + '\'' +
                ", memberLevel=" + memberLevel +
                ", createdAt=" + createdAt +
                ", modifiedAt=" + modifiedAt +
                '}';
    }
}
