package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.entity.elastic.MediaAutoComplete;
import com.ssafy.moa.api.entity.elastic.MediaAutoComplete2;
import com.ssafy.moa.api.entity.elastic.MediaInfoDocument;
import com.ssafy.moa.api.repository.elastic.MediaAutoCompleteRepository;
import com.ssafy.moa.api.repository.elastic.MediaInfoRepository;
import com.ssafy.moa.api.service.MediaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.Aggregations;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.client.elc.ElasticsearchTemplate;
import org.springframework.data.elasticsearch.client.erhlc.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class MediaServiceImpl implements MediaService {

    private final RestHighLevelClient restHighLevelClient;
    private final MediaInfoRepository mediaInfoRepository;
    private final MediaAutoCompleteRepository mediaAutoCompleteRepository;
//    @Autowired
//    private ElasticsearchTemplate elasticsearchTemplate;
//    private final ElasticsearchOperations elasticsearchOperations;

    @Override
    public List<MediaInfoDocument> searchMedia(String type, String mediaName) {
        List<MediaInfoDocument> mediaList = null;
        if (type.equals("all")){
            mediaList = mediaInfoRepository.findByTitleNmOrRelatePlaceDc(mediaName, mediaName);
        }
        else if (type.equals("mediaType")){
            mediaList = mediaInfoRepository.findByMediaTy(mediaName);
        }
        return mediaList;
    }

    @Override
    public List<String> getMediaType() throws IOException {
        SearchRequest searchRequest = new SearchRequest("media-info-imgs");
        SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();

        TermsAggregationBuilder aggregation = new TermsAggregationBuilder("mediaTy_terms")
                .field("titleNmKind")
                .size(5000);

        searchSourceBuilder.aggregation(aggregation);
        searchRequest.source(searchSourceBuilder);

        SearchResponse searchResponse = restHighLevelClient.search(searchRequest, RequestOptions.DEFAULT);

        Aggregations aggregations = searchResponse.getAggregations();
        ParsedStringTerms aggregationResult = aggregations.get("mediaTy_terms");
        log.info(String.valueOf(aggregationResult.getBuckets().size()));

        List<String> mediaTitleList = new ArrayList<>();
        for (Terms.Bucket bucket: aggregationResult.getBuckets()){
            mediaTitleList.add(bucket.getKeyAsString());
        }

        return mediaTitleList;
    }

//    @Override
//    public List<MediaInfoDocument> autoComplete(String mediaName) {
//        return mediaInfoRepository.findByTitleNm(mediaName);
//    }

    @Override
    public List<MediaAutoComplete2> autoComplete(String mediaName) {
        return mediaAutoCompleteRepository.findByTitleNm(mediaName);
//        Query searchQuery = new NativeSearchQueryBuilder()
//                .withQuery(matchQuery("titleNm", query).analyzer("my_ngram_analyzer"))
//                .build();
//
//        return elasticsearchTemplate.queryForList(searchQuery, MediaInfo.class);

//        QueryBuilder queryBuilder = QueryBuilders.matchQuery("titleNm.ngram", mediaName);
//
//        NativeSearchQueryBuilder searchQueryBuilder = new NativeSearchQueryBuilder();
//        searchQueryBuilder.withQuery(queryBuilder);
//        SearchHits<MediaAutoComplete> searchHits = elasticsearchTemplate.search(searchQueryBuilder.build(), MediaAutoComplete.class);
//        for (SearchHit<MediaAutoComplete> searchHit : searchHits) {
//            MediaAutoComplete document = searchHit.getContent();
//            String title = document.getTitleNm(); // YourEntityClass에 정의된 필드명을 사용
//            System.out.println("Title: " + title);
//        }
//
//        ArrayList<MediaAutoComplete> list = new ArrayList<>();
//        return list;

//        Query query = new NativeSearchQueryBuilder()
//                .withQuery(QueryBuilders.boolQuery()
//                        .must(QueryBuilders.queryStringQuery(mediaName)
//                                .field("titleNm.ngram"))
//                ).build();
//        SearchHits<MediaAutoComplete> searchHits = elasticsearchOperations.search(query, MediaAutoComplete.class);
//
//        return searchHits.stream()
//                .map(SearchHit::getContent)
//                .collect(Collectors.toList());

    }
}
