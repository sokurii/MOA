import { authAxios } from "./authAxios";
import { bigDataAxios } from "./bigDataAxios";
import { nonAuthAxios } from "./nonAuthAxios";

export const learningApi = {

    // 번역 호출
    translateText: (translatedText) => {
        const translateEndPoint = 'translation'

        const requestData = {
            translatedText: translatedText,
        };

        return nonAuthAxios.post(translateEndPoint, requestData);

    },

    // 뉴스 스크랩 여부 확인
    getIsNewsScrap: (articleOriginId) => authAxios.get(`scrap/news/check/${articleOriginId}`),

    // 뉴스 스크랩 등록
    createNewsScrap: (data) => authAxios.post('scrap/news', data),

    // 뉴스 스크랩 삭제
    deleteNewsScrap: (articleId) => authAxios.delete(`scrap/news/delete?type=news&articleId=${articleId}`),

    // 뉴스 기사 조회
    getNews: (articleId) => bigDataAxios.get(`articles/${articleId}`),

    // 단어 스크랩 여부 조회
    getIsWordScrap: (wordName) => authAxios.get(`scrap/words/check/${wordName}`),

    // 단어 스크랩 등록
    createWordScrap: (data) => authAxios.post('scrap/words', data),

    // 단어 스크랩 삭제
    deleteWordScrap: (wordName) => authAxios.delete(`scrap/words/delete-news/${wordName}`),

    // chat GPT에게 질문하기
    askToChatGpt: (data) => nonAuthAxios.post('/chat-gpt', data)
}