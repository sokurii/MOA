import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userApi } from '../api/userApi';
import Cookies from 'js-cookie';
import { useAppDispatch } from '../store'; // useDispatch를 사용하는 부분을 변경
import { setAccessToken, setIsForeigner, setIsMatching } from '../store';


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
  borderBottom: '1px solid #92BB69', // 밑줄 스타일
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
  const [isLogin, setIsLogin] = useState(false);

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
        navigate('/login-load');

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
    <div style={loginStyle}>
      <div className='loginContainer' style={loginContainerStyle}>
        <div style={logoContainerStyle}>
          <img style={logoStyle} src={process.env.PUBLIC_URL + '/assets/Logo/MoaLogo.png'} alt="로고" />
        </div>
        <form onSubmit={handleLogin}> {/* 폼 제출 이벤트 핸들러 */}
          <div style={inputFormContainerStyle}>
            <div style={inputFormStyle} className="inputForm">
              <label style={labelStyle} htmlFor="memberEmail" className="inputTitle">
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
              <label style={labelStyle} htmlFor="memberPassword" className="inputTitle">
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

          <input style={buttonStyle} type="submit" value="로그인" /> {/* 폼 제출 버튼 */}
        </form>
        {/* <Link to="/signup">
          <button>회원가입</button>
        </Link> */}

      </div>
      {loginError && <p className='error'>{loginError}</p>}
    </div>
  );
}

export default Login;
