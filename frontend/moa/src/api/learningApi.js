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

    }
}