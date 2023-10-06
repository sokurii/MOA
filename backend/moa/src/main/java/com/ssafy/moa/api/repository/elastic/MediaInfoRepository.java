package com.ssafy.moa.api.repository.elastic;

import com.ssafy.moa.api.entity.elastic.MediaInfoDocument;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

//@Repository
public interface MediaInfoRepository extends ElasticsearchRepository<MediaInfoDocument,String> {
    List<MediaInfoDocument> findByTitleNmOrRelatePlaceDc(String mediaName1, String mediaName2);
    List<MediaInfoDocument> findByMediaTy(String mediaType);
    List<MediaInfoDocument> findByTitleNm(String mediaType);
    List<MediaInfoDocument> findByRelatePlaceDc(String mediaName);
    List<MediaInfoDocument> findByMediaTyAndTitleNm(String mediaType, String mediaName);
}
