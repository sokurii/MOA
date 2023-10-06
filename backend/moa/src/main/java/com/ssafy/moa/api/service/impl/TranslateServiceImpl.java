package com.ssafy.moa.api.service.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.moa.api.service.TranslateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.weaver.tools.UnsupportedPointcutPrimitiveException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;


@Service
@RequiredArgsConstructor
@Slf4j
public class TranslateServiceImpl implements TranslateService {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${papago.client.id}")
    private String clientId;

    @Value("${papago.client.secret}")
    private String clientSecret;

    @Override
    public String translateText(String sentence) {

        String apiUrl = "https://openapi.naver.com/v1/papago/n2mt";
        String text;
        try {
            text = URLEncoder.encode(sentence, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("인코딩 실패", e);
        }

        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("x-naver-client-id", clientId);
        requestHeaders.put("x-naver-client-secret", clientSecret);

        return post(apiUrl, requestHeaders, text);
    }

    private static String post(String apiUrl, Map<String, String> requestHeaders, String text) {
        HttpURLConnection con = connect(apiUrl);
        String postParams = "source=ko&target=en&text=" + text;
        try {
            con.setRequestMethod("POST");
            for(Map.Entry<String, String> header : requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            con.setDoOutput(true);
            try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
                wr.write(postParams.getBytes());
                wr.flush();
            }

            int responseCode = con.getResponseCode();
            if(responseCode == HttpURLConnection.HTTP_OK) {
                return extractTranslatedText(readBody(con.getInputStream()));
            } else {
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }

    private static String extractTranslatedText(String jsonResponse) {
        try {
            JsonNode jsonNode = objectMapper.readTree(jsonResponse);
            JsonNode resultNode = jsonNode.path("message").path("result");
            return resultNode.path("translatedText").asText();
        } catch (IOException e) {
            throw new RuntimeException("JSON 파싱 실패", e);
        }
    }

    private static String readBody(InputStream body) {
        InputStreamReader inputStreamReader = new InputStreamReader(body);

        try(BufferedReader lineReader = new BufferedReader(inputStreamReader)) {
            StringBuilder responseBody = new StringBuilder();

            String line;
            while((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }

            return responseBody.toString();
        }
        catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
        }
    }

    private static HttpURLConnection connect(String apiUrl){
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection)url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }


}
