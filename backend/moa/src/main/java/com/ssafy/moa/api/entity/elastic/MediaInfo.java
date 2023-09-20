//package com.ssafy.moa.api.entity.elastic;
//
//import jakarta.persistence.Entity;
//import jakarta.persistence.Id;
//import jakarta.persistence.Table;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import org.springframework.data.elasticsearch.annotations.Field;
//import org.springframework.data.elasticsearch.annotations.FieldType;
//
//@Entity
//@Getter
//@NoArgsConstructor
//@Table(name = "media_info")
//public class MediaInfo {
//    @Id
//    private String id;
//
//    private String placeNm;
//
//    private String placeTy;
//
//    private String operTime;
//
//    private String restTime;
//
//    private String rstdeQuidCn;
//
//    private String addr;
//
//    private Float latitude;
//
//    private Float longitude;
//
//    private Long telNo;
//
//    private Integer seqNo;
//
//    private String mediaTy;
//
//    private String titleNm;
//
//    private String relatePlaceDc;
//
//    private Integer lastUpdtDe;
//
//    private String description;
//
//    @Builder
//    public MediaInfo(String id, String placeNm, String placeTy, String operTime, String restTime, String rstdeQuidCn, String addr, Float latitude, Float longitude, Long telNo, Integer seqNo, String mediaTy, String titleNm, String relatePlaceDc, Integer lastUpdtDe, String description) {
//        this.id = id;
//        this.placeNm = placeNm;
//        this.placeTy = placeTy;
//        this.operTime = operTime;
//        this.restTime = restTime;
//        this.rstdeQuidCn = rstdeQuidCn;
//        this.addr = addr;
//        this.latitude = latitude;
//        this.longitude = longitude;
//        this.telNo = telNo;
//        this.seqNo = seqNo;
//        this.mediaTy = mediaTy;
//        this.titleNm = titleNm;
//        this.relatePlaceDc = relatePlaceDc;
//        this.lastUpdtDe = lastUpdtDe;
//        this.description = description;
//    }
//}
