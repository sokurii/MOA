import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/userApi';
import Cookies from 'js-cookie';
import { useAppDispatch } from '../store';
import { setAccessToken } from '../store';

const loginStyle = {
  display: 'flex',
  justifyContent: 'center',
  background: 'linear-gradient(180deg, #E4EFB6 23%, white 100%)',
  minHeight: '100vh',
  padding: '0 30px',
};

const loginContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  background: 'white',
  borderRadius: '16px',
  width: '100%',
  margin: '200px auto',
  padding: '30px',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
};

const logoContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '10px',
};

const inputFormContainerStyle = {
  margin: '50px auto',
};

const inputFormStyle = {
  margin: '20px auto',
};

const logoStyle = {
  width: '100px',
};

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  fontWeight: '700',
};

const labelKorStyle = {
  fontSize: '18px',
  marginRight: '5px',
};

const labelEngStyle = {
  fontSize: '16px',
};

const inputStyle = {
  borderBottom: '1px solid #92BB69',
  borderLeft: 'none',
  borderRight: 'none',
  borderTop: 'none',
  margin: '10px auto',
  width: '95%',
  height: '30px',
};

const buttonStyle = {
  background: 'linear-gradient(104deg, #C4DD7C 0%, #A6CC38 100%)',
  color: 'white',
  fontSize: '20px',
  fontWeight: '700',
  width: '100%',
  border: 'none',
  borderRadius: '18px',
  margin: '20px auto',
  padding: '12px 0',
};


function Login(props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    memberEmail: '',
    memberPassword: '',
  });

  const [loginError, setLoginError] = useState('');

  useEffect(() => {
    // loginError가 변경될 때마다 애니메이션을 위해 opacity를 변경
    if (loginError) {
      const timer = setTimeout(() => {
        setLoginError(''); // 일정 시간 후에 loginError 초기화
      }, 5000); // 5초 후에 사라지도록 설정 (1000ms = 1초)
      
      return () => clearTimeout(timer); // 컴포넌트가 언마운트 될 때 타이머 제거
    }
  }, [loginError]);

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
      const response = await userApi.login(
        formData.memberEmail,
        formData.memberPassword
      );

      if (response.data.success) {
        console.log('로그인 성공', response);
        const accessToken = response.data.response.accessToken.substring(7);
        dispatch(setAccessToken(accessToken));

        const refreshToken = response.data.response.refreshToken.substring(7);

        Cookies.set('refreshToken', refreshToken, { expires: 7 });
        navigate('/login-load');
      } else {
        console.log('로그인 오류:', response.data.error.message);
        setLoginError('로그인에 실패했습니다.\n이메일 또는 비밀번호를 확인하세요.');
      }
    } catch (error) {
      console.log('API Request Error:', error);
      setLoginError('로그인 중 오류가 발생했습니다.\n나중에 다시 시도하세요.');
    }
  };

  const loginErrorStyle = {
    background: 'white',
    borderRadius: '18px',
    fontSize: '16px',
    fontWeight: '700',
    padding: '5px 10px',
    width: '80%',
    margin: '20px auto',
    position: 'fixed',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    bottom: '50px',
    transition: 'opacity 1s ease-in-out', // 애니메이션 효과
    opacity: loginError ? 1 : 0,
    whiteSpace: 'pre-line' // 줄바꿈
  };

  return (
    <div style={loginStyle}>
      <div className="loginContainer" style={loginContainerStyle}>
        <div style={logoContainerStyle}>
          <img
            style={logoStyle}
            src={process.env.PUBLIC_URL + '/assets/Logo/MoaLogo.png'}
            alt="로고"
          />
        </div>
        <form onSubmit={handleLogin}>
          <div style={inputFormContainerStyle}>
            <div style={inputFormStyle} className="inputForm">
              <label
                style={labelStyle}
                htmlFor="memberEmail"
                className="inputTitle"
              >
                <span style={labelKorStyle}>이메일</span>
                <span style={labelEngStyle}>Email</span>
              </label>
              <input
                style={inputStyle}
                type="text"
                id="memberEmail"
                name="memberEmail"
                onChange={handleInputChange}
              />
            </div>

            <div style={inputFormStyle} className="inputForm">
              <label
                style={labelStyle}
                htmlFor="memberPassword"
                className="inputTitle"
              >
                <span style={labelKorStyle}>비밀번호</span>
                <span style={labelEngStyle}>Password</span>
              </label>
              <input
                style={inputStyle}
                type="password"
                id="memberPassword"
                name="memberPassword"
                onChange={handleInputChange}
                autoComplete="off"
              />
            </div>
          </div>

          <input style={buttonStyle} type="submit" value="로그인" />
        </form>

      </div>
      {loginError && (
        <div style={loginErrorStyle}>
          <p className="error">{loginError}</p>
        </div>
      )}
    </div>
  );
}

export default Login;