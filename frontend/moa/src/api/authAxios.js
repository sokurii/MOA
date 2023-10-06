import baseAxios from 'axios';
import store from '../store'; // Redux 스토어를 import 해야 합니다

export const authAxios = baseAxios.create({
  baseURL: "https://moamore.site:8589/",
});

const AuthInterceptor = (config) => {
  // Redux 스토어에서 상태 가져오기
  const state = store.getState();
  const accessToken = state.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    console.log('accessToken이 존재하지 않습니다');
  }

  return config;
};

authAxios.interceptors.request.use(AuthInterceptor);