package com.ssafy.moa.api.entity;

import jakarta.persistence.*;

@Entity
public class Buddy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long buddyId;

    @OneToOne
    @JoinColumns({
            @JoinColumn(name = "foreigner_id"),
            @JoinColumn(name = "foreigner_code")
    })
    private Foreigner foreigner;

    @OneToOne
    @JoinColumns({
            @JoinColumn(name = "korean_id"),
            @JoinColumn(name = "korean_code")
    })
    private Korean korean;
}
