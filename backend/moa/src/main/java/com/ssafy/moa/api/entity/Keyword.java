package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "keyword")
public class Keyword {
    @Id
    @Column(name = "keyword_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long keywordId;

    @NotNull
    @Column(name = "keyword_name")
    private String keywordName;

    @ManyToOne
    @JoinColumn(name = "member_id", referencedColumnName = "member_id")
    private Member member;

    @Builder
    public Keyword(Long keywordId, @NotNull String keywordName, Member member) {
        this.keywordId = keywordId;
        this.keywordName = keywordName;
        this.member = member;
    }

    @Override
    public String toString() {
        return "Keyword{" +
                "keywordId=" + keywordId +
                ", keywordName='" + keywordName + '\'' +
                ", member=" + member +
                '}';
    }
}
