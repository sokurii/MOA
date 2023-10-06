import { authAxios } from "./authAxios";
import { nonAuthAxios } from "./nonAuthAxios";
import { bigDataAxios } from "./bigDataAxios";

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

    // 스크랩 등록
    createNewsScrap: (data) => authAxios.post('scrap/news', data),

    // Most Popular Word
    getPopularWord: () => bigDataAxios.get(`words/top?top_n=50`),

    // 단어로 연관 기사 조회
    getRelatedNewsByWord: (data) => bigDataAxios.get(`articles/with_word?word=${data}`),

    // 단어로 연관 문장 조회
    getRelatedNewsBySentence: (word) => bigDataAxios.get(`sentences/with_word?word=${word}`),

    // 뉴스 스크랩 등록
    createNewsScrap: (data) => authAxios.post('scrap/news', data),

    // 뉴스 스크랩 삭제
    deleteNewsScrap: (articleId) => authAxios.delete(`scrap/news/delete?type=news&articleId=${articleId}`),

    // 뉴스 스크랩 전체 조회
    getNewsScrap: () => authAxios.get('scrap/news'),

    // 뉴스 기사 조회
    getNews: (articleId) => bigDataAxios.get(`articles/${articleId}`),

    // 뉴스 단어 기사 조회
    getNewsWords: (articleId) => bigDataAxios.get(`words/in-article/${articleId}`),

    // 단어 스크랩 여부 조회
    getIsWordScrap: (wordName) => authAxios.get(`scrap/words/check/${wordName}`),

    // 단어 스크랩 등록
    createWordScrap: (data) => authAxios.post('scrap/words', data),

    // 단어 스크랩 삭제
    deleteWordScrap: (wordName) => authAxios.delete(`scrap/words/delete-news/${wordName}`),

    // 단어 스크랩 조회
    getWordScrap: () => authAxios.get('scrap/words'),

    // chat GPT에게 질문하기
    askToChatGpt: (data) => nonAuthAxios.post('/chat-gpt', data),

    // 스크랩북에서 단어 삭제
    deleteWordScrapBook: (wordId) => authAxios.delete(`scrap/words/${wordId}`),

    // 스크랩북에서 뉴스 삭제
    deleteNewsScrapBook: (articleId) => authAxios.delete(`scrap/news/delete?type=scrap&articleId=${articleId}`),
}