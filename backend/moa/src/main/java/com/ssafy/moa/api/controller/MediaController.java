package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.entity.elastic.MediaAutoComplete;
import com.ssafy.moa.api.entity.elastic.MediaAutoComplete2;
import com.ssafy.moa.api.entity.elastic.MediaInfoDocument;
import com.ssafy.moa.api.service.MediaService;
import com.ssafy.moa.common.utils.ApiUtils;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.lucene.index.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

import static com.ssafy.moa.common.utils.ApiUtils.success;

@RestController
@RequestMapping("/media")
@RequiredArgsConstructor
@Slf4j
public class MediaController {

    private final MediaService mediaService;

    // 검색(조회)
    @Operation(summary = "미디어 제목 or 아티스트 검색", description = "드라마 속 장소나 아티스트가 방문한 장소의 정보를 검색어를 기반으로 반환합니다. </br> type이 all일 때는 전체 검색 -> 드라마 or 아티스트 or 장소설명 3가지 중 하나만 만족해도 검색됨</br> type이 mediaType일 때는 컨텐츠종류(drama, artist, show movie)에 따른 결과 검색 -> mediaName에는 drama, artist, show, movie 4가지만 가능", tags = { "Media Controller" })
    @GetMapping("/search")
    public ApiUtils.ApiResult<List<MediaInfoDocument>> searchMedia(@RequestParam(name = "type") String type, @RequestParam(name = "mediaName") String mediaName){
        List<MediaInfoDocument> mediaList = mediaService.searchMedia(type, mediaName);
        return success(mediaList);
    }

    // 미디어 제목 or 아티스트 종류 가져오기
    @Operation(summary = "미디어 제목 or 아티스트 종류 조회", description = "아티스트, 드라마의 종류들을 반환합니다.", tags = { "Media Controller" })
    @GetMapping("/mediaType")
    public ApiUtils.ApiResult<List<String>> getMediaType() throws IOException {
        List<String> mediaTypeList = mediaService.getMediaType();
        return success(mediaTypeList);
    }

//    // 미디어 or 아티스트 이름 기반 검색 가져오기
//    @Operation(summary = "미디어 제목 or 아티스트 종류 조회", description = "아티스트, 드라마의 종류들을 반환합니다.", tags = { "Media Controller" })
//    @GetMapping("/search/mediaType")
//    public ApiUtils.ApiResult<List<MediaInfoDocument>> searchMediaType(@RequestParam(name = "mediaType") String mediaType){
//        List<MediaInfoDocument> mediaList = mediaService.searchMediaType(mediaType);
//        return success(mediaList);
//    }


    // 미디어 제목 or 아티스트 자동완성
    @Operation(summary = "자동완성", description = "미디어 제목이나 아티스트 이름으로 연관되는 단어를 반환합니다.", tags = { "Media Controller" })
    @GetMapping("/auto-complete")
    public ApiUtils.ApiResult<List<MediaAutoComplete2>> autoComplete(@RequestParam(name = "mediaName") String mediaName){
        List<MediaAutoComplete2> mediaList = mediaService.autoComplete(mediaName);
        return success(mediaList);
    }

//    @Operation(summary = "자동완성", description = "미디어 제목이나 아티스트 이름으로 연관되는 단어를 반환합니다.", tags = { "Media Controller" })
//    @GetMapping("/auto-complete")
//    public ApiUtils.ApiResult<List<MediaInfoDocument>> autoComplete(@RequestParam(name = "mediaName") String mediaName){
//        List<MediaInfoDocument> mediaList = mediaService.autoComplete(mediaName);
//        return success(mediaList);
//    }

    // 미디어 내용 자동완성
}
