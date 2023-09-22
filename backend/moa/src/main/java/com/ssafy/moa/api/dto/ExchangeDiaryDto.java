package com.ssafy.moa.api.dto;

import com.ssafy.moa.api.dto.member.MemberDto;
import com.ssafy.moa.api.entity.ExchangeDiary;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

public class ExchangeDiaryDto {

    @Value("${spring.cloud.gcp.storage.bucket}")
    private static String bucketName;
    private static final String url = "https://storage.googleapis.com/";
    @Getter
    @NoArgsConstructor
    public static class ExchangeDiaryRequest {
        private String exchangeDiaryContent;
    }

    @Getter
    public static class ExchangeDiaryDetailResponse {
        private MemberDto member;
        private Long exchangeDiaryId;
        private String exchangeDiaryContent;
        private String exchangeDiaryImgUrl;
        private LocalDateTime exchangeDiaryDate;

        @Builder
        public ExchangeDiaryDetailResponse(MemberDto member, Long exchangeDiaryId, String exchangeDiaryContent, String exchangeDiaryImgUrl, LocalDateTime exchangeDiaryDate) {
            this.member = member;
            this.exchangeDiaryId = exchangeDiaryId;
            this.exchangeDiaryContent = exchangeDiaryContent;
            this.exchangeDiaryImgUrl = exchangeDiaryImgUrl;
            this.exchangeDiaryDate = exchangeDiaryDate;
        }
    }

    @Getter
    public static class ExchangeDiaryResponse {
        List<ExchangeDiaryDetailResponse> exchangeDiaryResponseList;

        @Builder
        public ExchangeDiaryResponse(List<ExchangeDiary> exchangeDiaryList) {
            List<ExchangeDiaryDetailResponse> list = exchangeDiaryList.stream()
                    .map(exchangeDiary -> {
                        MemberDto memberDto = MemberDto.builder().member(exchangeDiary.getMember()).build();
                        String imgUrl = url + bucketName + "/diary/" + exchangeDiary.getExchangeDiaryPicture();

                        return ExchangeDiaryDetailResponse.builder()
                                .member(memberDto)
                                .exchangeDiaryId(exchangeDiary.getExchangeDiaryId())
                                .exchangeDiaryContent(exchangeDiary.getExchangeDiaryContent())
                                .exchangeDiaryImgUrl(imgUrl)
                                .exchangeDiaryDate(exchangeDiary.getExchangeDiaryDate())
                                .build();
                    })
                    .collect(Collectors.toList());
            this.exchangeDiaryResponseList = list;
        }
    }

    @Getter
    public static class ExchangeDiaryUpdateRequest {
        private String exchangeDiaryContent;
    }
}
