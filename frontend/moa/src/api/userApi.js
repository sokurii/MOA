import { axios } from './https';

export const userApi = {
  // 회원가입
  signUp : (data) => axios.post('member/signup',data),

  // 이메일 인증
  emailVerification: (email) => {
    // 이메일 인증 api 엔드포인트
    const emailVerificationApiEndPoint = 'member/signup/email';

    // 요청 본문 데이터
    const requestData = {
      memberEmail: email,
    };

    return axios.post(emailVerificationApiEndPoint, requestData);
  },

  // 로그인
  login : (email, password) => {
    // 로그인 엔드포인트
    const loginApiEndPoint = 'member/login';

    const requestData = {
      memberEmail : email,
      memberPassword: password,
    };

    return axios.post(loginApiEndPoint, requestData);
  }
};
