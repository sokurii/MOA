package com.ssafy.moa.api.service;


import com.ssafy.moa.api.dto.NationCodeDto;

import java.util.List;

public interface EtcService {


    List<NationCodeDto> findAllNation();
}
