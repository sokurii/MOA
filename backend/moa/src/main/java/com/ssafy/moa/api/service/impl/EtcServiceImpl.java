package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.dto.NationCodeDto;
import com.ssafy.moa.api.entity.NationCode;
import com.ssafy.moa.api.repository.NationRepository;
import com.ssafy.moa.api.service.EtcService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EtcServiceImpl implements EtcService {

    private final NationRepository nationRepository;

    // 국가 전체 조회
    @Override
    public List<NationCodeDto> findAllNation() {
        List<NationCode> nationCodeList = nationRepository.findAll();
        return nationCodeList.stream()
                .map(NationCodeDto::new)
                .collect(Collectors.toList());
    }
}
