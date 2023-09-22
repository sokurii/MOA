import baseAxios from 'axios';
import { useSelector } from 'react-redux';

export const nonAuthAxios = baseAxios.create({
    baseURL: "https://moamore.site:8589/",
});


export const authAxios = baseAxios.create({
  baseURL: "https://moamore.site:8589/",
});

const useAccessToken = () => useSelector((state) => state.accessToken);

authAxios.interceptors.request.use((config) => {
  const accessToken = useAccessToken(); // store에서 AccessToken 가져오기
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});