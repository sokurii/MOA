package com.ssafy.moa.api.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Buddy {

    @Id
    @Column(name = "buddy_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buddyId;

    @OneToOne(mappedBy = "buddy")
    private Foreigner foreigner;

    @OneToOne(mappedBy = "buddy")
    private Korean korean;
}
