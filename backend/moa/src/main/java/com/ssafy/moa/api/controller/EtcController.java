package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.NationCodeDto;
import com.ssafy.moa.api.jwt.JwtTokenProvider;
import com.ssafy.moa.api.service.EtcService;
import com.ssafy.moa.common.utils.ApiUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import java.util.List;
import static com.ssafy.moa.common.utils.ApiUtils.success;

@RestController
@RequiredArgsConstructor
public class EtcController {

    private final JwtTokenProvider jwtTokenProvider;
    private final EtcService etcService;

    // 국가 전체 조회 API
    @GetMapping("/nation")
    public ApiResult<List<NationCodeDto>> searchAllNation() {
        List<NationCodeDto> nationCodeDtoList = etcService.findAllNation();
        return success(nationCodeDtoList);
    }

}
