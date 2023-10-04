import { nonAuthAxios } from "./nonAuthAxios"

export const koreaTourApi = {
    // 컨텐츠 검색
  getMediaList: (type, mediaName) => nonAuthAxios.get(`media/search?type=${type}&mediaName=${mediaName}`),
  getAutoComplete: (mediaName) => nonAuthAxios.get(`media/auto-complete?mediaName=${mediaName}`),
  }