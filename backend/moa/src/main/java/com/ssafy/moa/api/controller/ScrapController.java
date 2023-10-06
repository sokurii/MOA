package com.ssafy.moa.api.controller;

import com.ssafy.moa.api.dto.scrap.ArticleDto;
import com.ssafy.moa.api.dto.scrap.ArticleReqDto;
import com.ssafy.moa.api.dto.scrap.WordDto;
import com.ssafy.moa.api.dto.scrap.WordReqDto;
import com.ssafy.moa.api.entity.elastic.MediaInfoDocument;
import com.ssafy.moa.api.jwt.JwtTokenProvider;
import com.ssafy.moa.api.service.ArticleService;
import com.ssafy.moa.api.service.WordService;
import com.ssafy.moa.common.utils.ApiUtils.ApiResult;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.ssafy.moa.common.utils.ApiUtils.success;

@RestController
@RequestMapping("/scrap")
@RequiredArgsConstructor
@Slf4j
public class ScrapController {
    private final ArticleService articleService;
    private final WordService wordService;
    private final JwtTokenProvider jwtTokenProvider;

    // 뉴스
    @Operation(summary = "뉴스 스크랩북 등록", description = "뉴스를 내 스크랩북에 등록할 수 있습니다.", tags = { "Scrap Controller" })
    @PostMapping("/news")
    public ApiResult<Long> createArticleScrap(@RequestHeader("Authorization") String header, @RequestBody ArticleReqDto articleReqDto){
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        return success(articleService.createArticleScrap(memberId, articleReqDto));
    }

    // Todo : 추후 authentication를 사용해서 실제 memberId로 변경
    @Operation(summary = "스크랩북 뉴스 전체 조회", description = "내가 스크랩한 모든 뉴스를 조회할 수 있습니다.", tags = { "Scrap Controller" })
    @GetMapping("/news")
    public ApiResult<List<ArticleDto>> getAllArticleScrap(@RequestHeader("Authorization") String header){
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        return success(articleService.getAllArticleScrap(memberId));
    }

    @Operation(summary = "스크랩북 뉴스 상세 조회", description = "내가 선택한 스크랩 뉴스의 상세정보를 조회할 수 있습니다.", tags = { "Scrap Controller" })
    @GetMapping("/news/{articleId}")
    public ApiResult<ArticleDto> getArticle(@PathVariable("articleId") Long articleId){
        return success(articleService.getArticle(articleId));
    }

    @Operation(summary = "스크랩북 뉴스 삭제", description = "내가 선택한 스크랩 뉴스를 삭제 할 수 있습니다. <br> 뉴스에서 스크랩 삭제 : type=news&articleId={articleOriginId} <br> 스크랩북에서 뉴스 삭제 : type=scrap&articleId={articleId}", tags = { "Scrap Controller" })
    @DeleteMapping("/news/delete")
    public ApiResult<Long> deleteArticle(@RequestHeader("Authorization") String header, @RequestParam(name = "type") String type, @RequestParam(name = "articleId") Long articleId){
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        return success(articleService.deleteArticle(type, memberId, articleId));
    }

    @Operation(summary = "뉴스 스크랩 여부 조회", description = "사전에 스크랩 한 뉴스인지 스크랩여부를 조회할 수 있습니다.", tags = { "Scrap Controller" })
    @GetMapping("/news/check/{articleOriginId}")
    public ApiResult<Long> checkArticle(@RequestHeader("Authorization") String header, @PathVariable("articleOriginId") Long articleOriginId){
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        return success(articleService.checkArticle(memberId, articleOriginId));
    }

    // 단어
    @Operation(summary = "단어 스크랩북 등록", description = "단어를 내 스크랩북에 등록할 수 있습니다.", tags = { "Scrap Controller" })
    @PostMapping("/words")
    public ApiResult<Long> createWordScrap(@RequestHeader("Authorization") String header, @RequestBody WordReqDto wordReqDto){
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        return success(wordService.createWordScrap(memberId, wordReqDto));
    }

    // Todo : 추후 authentication를 사용해서 실제 memberId로 변경
    @Operation(summary = "스크랩북 단어 전체 조회", description = "내가 스크랩한 모든 단어를 조회할 수 있습니다.", tags = { "Scrap Controller" })
    @GetMapping("/words")
    public ApiResult<List<WordDto>> getAllWordScrap(@RequestHeader("Authorization") String header){
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        return success(wordService.getAllWordScrap(memberId));
    }

    @Operation(summary = "스크랩북 단어 상세 조회", description = "내가 선택한 스크랩 단어의 상세정보를 조회할 수 있습니다.", tags = { "Scrap Controller" })
    @GetMapping("/words/{wordId}")
    public ApiResult<WordDto> getWord(@PathVariable("wordId") Long wordId){
        return success(wordService.getWord(wordId));
    }

    @Operation(summary = "스크랩북 단어 삭제(기사와 스크랩북 모두 가능)", description = "스크랩한 단어를 삭제 할 수 있습니다. <br> 기사에서 삭제할 때 : type=news&wordName={wordName} <br> 스크랩북에서 삭제할 때 : type=scrap&wordId={wordId}", tags = { "Scrap Controller" })
    @DeleteMapping("/words/delete")
    public ApiResult<Long> deleteWordAll(@RequestHeader("Authorization") String header, @RequestParam(name = "type", required = false) String type, @RequestParam(name = "wordId", required = false) Long wordId, @RequestParam(name = "wordName", required = false) String wordName){
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        return success(wordService.deleteWordAll(type, memberId, wordId, wordName));
    }

    @Operation(summary = "스크랩북 단어 삭제(My 스크랩북에서)", description = "나의 스크랩북에서 내가 선택한 스크랩 단어를 삭제 할 수 있습니다.", tags = { "Scrap Controller" })
    @DeleteMapping("/words/{wordId}")
    public ApiResult<Long> deleteWord(@PathVariable(name = "wordId") Long wordId){
        return success(wordService.deleteWord(wordId));
    }

    @Operation(summary = "스크랩북 단어 삭제(기사에서)", description = "기사에서 보는 스크랩 단어를 삭제 할 수 있습니다.", tags = { "Scrap Controller" })
    @DeleteMapping("/words/delete-news/{wordName}")
    public ApiResult<Long> deleteWordInNews(@RequestHeader("Authorization") String header, @PathVariable(name = "wordName") String wordName){
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        return success(wordService.deleteWordInNews(memberId, wordName));
    }

    @Operation(summary = "단어 스크랩 여부 조회", description = "사전에 스크랩 한 단어인지 스크랩여부를 조회할 수 있습니다.", tags = { "Scrap Controller" })
    @GetMapping("/words/check/{wordName}")
    public ApiResult<Long> checkWord(@RequestHeader("Authorization") String header, @PathVariable("wordName") String wordName){
        String token = header.substring(7);
        Long memberId = jwtTokenProvider.extractMemberId(token);
        return success(wordService.checkWord(memberId, wordName));
    }
}
