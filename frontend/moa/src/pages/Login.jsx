import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/userApi';
import Cookies from 'js-cookie';
import { useAppDispatch } from '../store'; // useDispatch를 사용하는 부분을 변경
import { setAccessToken } from '../store';

function Login(props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    memberEmail: '',
    memberPassword: '',
  });

  const [loginError, setLoginError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await userApi.login(formData.memberEmail, formData.memberPassword);

      if (response.data.success) {
        console.log('로그인 성공', response);
        const accessToken = response.data.response.accessToken.substring(7);
        dispatch(setAccessToken(accessToken));

        const refreshToken = response.data.response.refreshToken.substring(7);
        Cookies.set('refreshToken', refreshToken, { expires: 7 });

        navigate('/');
      } else {
        console.log('로그인 오류:', response.data.error.message);
        setLoginError('로그인에 실패했습니다. 이메일 또는 비밀번호를 확인하세요');
      }
    } catch (error) {
      console.log('API Request Error:', error);
      setLoginError('로그인 중 오류가 발생했습니다. 나중에 다시 시도하세요');
    }
  };

  return (
    <div>
      <p>Login Page</p>
      <div className='loginContainer'>
        <form onSubmit={handleLogin}> {/* 폼 제출 이벤트 핸들러 */}
          <div className="inputForm">
            <label htmlFor="memberEmail" className="inputTitle">이메일</label>
            <input
              type="text"
              id="memberEmail"
              name="memberEmail"
              onChange={handleInputChange}
            />
          </div>

          <div className="inputForm">
            <label htmlFor="memberPassword" className="inputTitle">비밀번호</label>
            <input
              type="password"
              id="memberPassword"
              name="memberPassword"
              onChange={handleInputChange}
              autoComplete="off"
            />
          </div>

          <input type="submit" value="로그인" /> {/* 폼 제출 버튼 */}
        </form>

        {loginError && <p className='error'>{loginError}</p>}
      </div>
    </div>
  );
}

export default Login;
