import { authAxios } from "./authAxios";
import { nonAuthAxios } from "./nonAuthAxios";

export const learningApi = {

    // 번역 호출
    translateText : (translatedText) => {
        const translateEndPoint = 'translation'

        const requestData = {
            translatedText: translatedText,
        };

        return nonAuthAxios.post(translateEndPoint, requestData);

    },

    // 스크랩 여부 확인
    getIsNewsScrap : (articleOriginId) => authAxios.get(`scrap/news/check/${articleOriginId}`)
}