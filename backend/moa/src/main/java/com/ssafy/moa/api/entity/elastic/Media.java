package com.ssafy.moa.api.entity.elastic;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Media {
    private Integer seq_no;
    private String media_ty;
    private String title_nm;
    private String relate_place_dc;
    private Integer last_updt_de;

    @Builder
    public Media(Integer seq_no, String media_ty, String title_nm, String relate_place_dc, Integer last_updt_de) {
        this.seq_no = seq_no;
        this.media_ty = media_ty;
        this.title_nm = title_nm;
        this.relate_place_dc = relate_place_dc;
        this.last_updt_de = last_updt_de;
    }
}
