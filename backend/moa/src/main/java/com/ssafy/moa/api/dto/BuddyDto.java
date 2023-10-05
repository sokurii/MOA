package com.ssafy.moa.api.dto;

import lombok.Getter;

import java.util.List;

public class BuddyDto {

    @Getter
    public static class KoreanBuddyPostRequest {
        private int nationCode;
        private List<Integer> interest;
        private int gender;
    }

    @Getter
    public static class ForeignerBuddyPostRequest {
        private List<Integer> interest;
        private int gender;
    }


}
