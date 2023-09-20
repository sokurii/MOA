package com.ssafy.moa.api.service.impl;

import com.ssafy.moa.api.entity.elastic.MediaInfoDocument;
import com.ssafy.moa.api.repository.elastic.MediaInfoRepository;
import com.ssafy.moa.api.service.MediaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.search.aggregations.Aggregations;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.TermsAggregationBuilder;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class MediaServiceImpl implements MediaService {

    private final RestHighLevelClient restHighLevelClient;
    private final MediaInfoRepository mediaInfoRepository;


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
        SearchRequest searchRequest = new SearchRequest("media-info-example");
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
}
