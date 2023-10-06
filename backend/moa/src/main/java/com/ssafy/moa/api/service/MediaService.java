package com.ssafy.moa.api.service;

import com.ssafy.moa.api.entity.elastic.MediaAutoComplete;
import com.ssafy.moa.api.entity.elastic.MediaAutoComplete2;
import com.ssafy.moa.api.entity.elastic.MediaInfoDocument;
import org.apache.lucene.index.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.ParsedStringTerms;

import java.io.IOException;
import java.util.List;

public interface MediaService {
    List<MediaInfoDocument> searchMedia(String type, String mediaName);

    List<String> getMediaType() throws IOException;

    List<MediaAutoComplete2> autoComplete(String mediaName);
//    List<MediaInfoDocument> autoComplete(String mediaName);

}
