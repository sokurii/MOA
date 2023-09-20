import { axios } from './https';

export const userApi = {
  // 회원가입
  signUp : (data) => axios.post('member/signup',data)
}