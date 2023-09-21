import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/userApi';
import Cookies from 'js-cookie';
// import BackButton from '../components/BackButton';
// import MainButton from '../components/MainButton';

function Login(props) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    memberEmail:'',
    memberPassword: '',
  });

  const [loginError, setLoginError] = useState('');

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name] : value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await userApi.login(formData.memberEmail, formData.memberPassword);

      if(response.data.success) {
        console.log('로그인 성공', response);

        // refreshToken 쿠키 설정
        const refreshToken = response.data.response.refreshToken.substring(7);
        Cookies.set("refreshToken", refreshToken, {expires: 14});

        navigate('/intro');
      } else {
        console.log('로그인 오류:', response.data.error.message);
        setLoginError('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요');
      } 
    }catch (error){
      console.log('API Request Error:', error);
      setLoginError('로그인 중 오류가 발생했습니다. 나중에 다시 시도하세요');
    }
  };
  
  return (
    <div>
      <p>Login Page</p>
      <div className='loginContainer'>
        <div className="inputForm">
          <label htmlFor="memberEmail" className="inputTitle">이메일</label>
          <input type="text" id="memberEmail" name="memberEmail" onChange={handleInputChange}/>
        </div>

        <div className="inputForm">
          <label htmlFor="memberPassword" className="inputTitle">비밀번호</label>
          <input type="password" id="memberPassword" name="memberPassword" onChange={handleInputChange}/>
        </div>


        {/* 로그인 기능 기능구현은 X */}
        <button type="submit" onClick={handleLogin}>로그인</button>
        {loginError && <p className='error'>{loginError}</p>}
        {/* <MainButton text="로그인" to="/main" /> */}
      </div>
      {/* <BackButton /> */}
    </div>
  );
}

export default Login;