import { axios } from './https';

export const userApi = {
  // 회원가입
  signUp : (data) => axios.post('member/signup',data),


  // 이메일 인증
  emailVerification: (email) => {
    const emailVerificationApiEndPoint = 'member/signup/email';     // 이메일 인증 api 엔드포인트

    const requestData = {         
      email: email,           // 요청 본문 데이터
    };

    return axios.post(emailVerificationApiEndPoint, requestData);
  },

  // 인증코드 확인 
  verificationCode: (emailCode) => {
    const verificationCodeApiEndPoint = 'member/signup/email';

    const requestData = {
      emailCode : emailCode,
    };

    return axios.delete(verificationCodeApiEndPoint, {data:requestData});
  },


  // 로그인
  login : (email, password) => {
    const loginApiEndPoint = 'member/login'; // 로그인 엔드포인트

    const requestData = {
      memberEmail : email,
      memberPassword: password,
    };

    return axios.post(loginApiEndPoint, requestData);
  },

  // 로그아웃
  logout: () => axios.delete('/member/logout'),


  // 국가 정보 조회
  getNations: () => axios.get('/nation'),


  // 회원 정보 조회
  getMemberInfo: () => axios.get('/member'),
};
