package com.ssafy.moa.api.entity.elastic;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Geo {
    private String place_nm;
    private String place_ty;
    private String oper_time;
    private String rest_time;
    private String rstde_guid_cn;
    private String addr;
    private Float latitude;
    private Float longitude;
    private Long tel_no;
//    private GeoLocation location;

    @Builder
    public Geo(String place_nm, String place_ty, String oper_time, String rest_time, String rstde_guid_cn, String addr, Float latitude, Float longitude, Long tel_no) {
        this.place_nm = place_nm;
        this.place_ty = place_ty;
        this.oper_time = oper_time;
        this.rest_time = rest_time;
        this.rstde_guid_cn = rstde_guid_cn;
        this.addr = addr;
        this.latitude = latitude;
        this.longitude = longitude;
        this.tel_no = tel_no;
    }
}
