import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/userApi';

import AppBar from '../components/AppBar';
import BackButton from '../components/BackButton';

const signupStyle = {
  minHeight: '100vh',
};

const signupContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  padding: '20px 30px',
};

const inputContainerStyle = {
  margin: '15px 0',
};

const radioContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '10px 0',
};

const radioStyle = {
  display: 'flex',
  width: '50%',
};

const radioButtonStyle = {
  marginRight: '10px',
};

const radioLabelStyle = {
  fontWeight: '500'
};

const radioLabelKorStyle = {
  fontSize: '18px',
  marginRight: '5px',
};

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  fontWeight: '700',
};

const labelKorStyle = {
  fontSize: '20px',
  marginRight: '5px',
};

const labelEngStyle = {
  fontSize: '18px',
};

const inputStyle = {
  fontSize: '18px',
  fontWeight: '500',
  borderBottom: '1px solid #92BB69', // 밑줄 스타일
  borderLeft: 'none',
  borderRight: 'none',
  borderTop: 'none',
  margin: '10px auto',
  width: '100%',
  height: '30px',
};

const optionStyle = {
};

const verificationButtonStyle = {
  margin: '10px auto',
  padding: '12px',
  background: 'white',
  border: 'none',
  borderRadius: '10px',
  boxShadow: '0px 10px 10px rgba(196, 221, 124, 0.25)',
  color: '#92BB69',
  fontSize: '20px',
  fontWeight: '700',
  width: '100%',
};

const noticeStyle = {
  fontSize: '14px',
  fontWeight: '400',
};

const buttonContainerStyle = {

};

const signupButtonStyle = {
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


function SignUp(props) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    memberEmail: '',
    memberPassword: '',
    memberName: '',
    memberGender: 0,
    memberIsForeigner: false,
    nationName: '한국',
    verificationCode: '',
  });

  const [passwordValid, setPasswordValid] = useState(true); // 비밀번호 유효성
  const [timer, setTimer] = useState(180);
  const [timerStarted, setTimerStarted] = useState(false); // 타이머 시작 여부
  const [verificationSent, setVerificationSent] = useState(false); // 인증번호 전송 여부
  const [nations, setNations] = useState([]); // 국가 정보

  useEffect(() => {
    const passwordValid = validatePassword(formData.memberPassword);
    setPasswordValid(passwordValid);
    
    // 국가 정보 조회
    fetchNations();
  }, [formData.memberPassword]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // 비밀번호 유효성
    if (name === 'memberPassword') {
      const passwordValid = validatePassword(value);
      setPasswordValid(passwordValid);
    }
  };

  // 비밀번호 유효성 검사
  const validatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  // 타이머 시작
  const startTimer = () => {
    setTimer(300);
    setTimerStarted(true); // 타이머 시작됨 표시
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      setTimerStarted(false); // 타이머 종료됨 표시
    }, 300000);
  };

  // 이메일 인증코드 전송 및 타이머 
  const handleSendVerificationCode = async () => {
    try {
      const response = await userApi.emailVerification(formData.memberEmail);

      if (response.data.success) {
        console.log('이메일 인증 요청 성공');
        setVerificationSent(true);
        setTimerStarted(true);
        startTimer();
      } else {
        console.log('이메일 인증 요청 오류:', response.data.error.message);
      }
    } catch (error) {
      console.error('API Request Error:', error);
    }
  };

  // 인증코드 확인
  const handleVerificationCode = async () => {
    try {
      const response = await userApi.verificationCode(formData.verificationCode);

      if (response.data.success) {
        console.log('인증 성공 : ', response);
        alert('인증이 완료되었습니다.');
      } else {
        console.log('인증 실패 :', response.data.error.message);
        alert('인증에 실패하였습니다');
      } 
    } catch(error){
      console.log('API Request Error:', error);
      alert('인증코드 확인 중 오류가 발생했습니다. 다시 시도해주세요')
    }
  };

  // 회원가입 제출
  const handleForSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userApi.signUp(formData);

      if (response.data.success) {
        const res = response.data.response;
        const isForeigner = res.memberIsForeigner;
        console.log('회원가입 성공', response);
        alert('회원가입 성공!');
        navigate('/login');
      } else {
        console.log('회원가입 오류: ', response.data.error.message);
      }
    } catch (error) {
      console.error('API Request Error:', error);
    }
  };

  // 국가 정보 조회
  const fetchNations = async () =>{
    try{
      const response = await userApi.getNations();

      if (response.data.success) {
        setNations(response.data.response);
      } else {
        console.log('국가 정보 조회 실패:', response.data.error.message);
      }
    } catch (error) {
      console.log('API Request Error:', error);
    }
  };

  return (
    <div style={signupStyle}>
      <AppBar />
      <div style={signupContainerStyle} className='signUpContainer'>
        <div style={inputContainerStyle}>
          <label style={labelStyle} htmlFor="" className="inputTitle">
            <span style={labelKorStyle}>나는</span>
            <span style={labelEngStyle}>I'm</span>
          </label>
          <div style={radioContainerStyle}>
            <div style={radioStyle}>
              <input style={radioButtonStyle} type="radio" id="foreigner" name="memberIsForeigner" value="true"/>
              <label style={radioLabelStyle} htmlFor="foreigner">
                <span style={radioLabelKorStyle}>외국인</span>
                <span>Foreigner</span>
              </label>
            </div>
            <div style={radioStyle}>
              <input style={radioButtonStyle} type="radio" id="korean" name="memberIsForeigner" value="false"/>
              <label style={radioLabelStyle} htmlFor="korean">
                <span style={radioLabelKorStyle}>한국인</span>
                <span>Korean</span>
              </label>
            </div>
          </div>
        </div>

        <div style={inputContainerStyle} className="inputForm">
          <label style={labelStyle} htmlFor="memberName" className="inputTitle">
            <span style={labelKorStyle}>이름</span>
            <span style={labelEngStyle}>Name</span>
          </label>
          <input style={inputStyle} type="text" id="memberName" name="memberName" onChange={handleInputChange}/>
        </div>

        <div style={inputContainerStyle} className="inputForm">
          <label style={labelStyle} htmlFor="nationName" className="inputTitle">
            <span style={labelKorStyle}>국적</span>
            <span style={labelEngStyle}>Nationality</span>
          </label>
          <select style={inputStyle} name="nationName" onChange={handleInputChange}>
            {nations.map((nation) => (
              <option style={optionStyle} key={nation.nationCode} value={nation.nationName}>
                {nation.nationName}
              </option>
            ))}
          </select>
        </div>

        <div style={inputContainerStyle} className="inputForm">
          <label style={labelStyle} htmlFor="memberGender" className="inputTitle">
            <span style={labelKorStyle}>성별</span>
            <span style={labelEngStyle}>Gender</span>
          </label>
          <div style={radioContainerStyle}>
            <div style={radioStyle}>
              <input style={radioButtonStyle} type="radio" id="man" name="memberGender" value="2" onChange={handleInputChange}/>
              <label style={radioLabelStyle} htmlFor="man">
                <span style={radioLabelKorStyle}>남자</span>
                <span>Man</span>
              </label>
            </div>
            <div style={radioStyle}>
              <input style={radioButtonStyle} type="radio" id="woman" name="memberGender" value="1" onChange={handleInputChange}/>
              <label style={radioLabelStyle} label htmlFor="woman">
                <span style={radioLabelKorStyle}>여자</span>
                <span>Woman</span>
              </label>
            </div>
          </div>
        </div>

        <div style={inputContainerStyle} className="inputForm">
          <label style={labelStyle} htmlFor="memberEmail" className="inputTitle">
            <span style={labelKorStyle}>이메일</span>
            <span style={labelEngStyle}>Email</span>
          </label>
          <input style={inputStyle} type="text" id="memberEmail" name="memberEmail" onChange={handleInputChange}/>
        </div>
        
        {/* 이메일 인증 */}
        <div style={buttonContainerStyle}>
          <button style={verificationButtonStyle} onClick={handleSendVerificationCode}>인증번호 전송</button>
        </div>

        {/* 인증 시 타이머*/}
        {timerStarted ? (
          <span>
            <span id="min">{Math.floor(timer / 60)}</span> :
            <span id="sec">{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</span>
          </span>
        ) : null}
        {/* 인증 번호 입력란 */}
        {verificationSent ? (
          <div style={inputContainerStyle} className='inputForm'>
            <label style={labelStyle} htmlFor="verificationCode" className='inputTitle'>
              <span style={labelKorStyle}>인증번호</span>
              <span style={labelEngStyle}>Verification Code</span>
            </label>
            <input style={inputStyle} type='text' id='verificationCode' name='verificationCode' onChange={handleInputChange} />
            <button onClick={handleVerificationCode}>인증확인</button>
          </div>
        ) : null}


        <div style={inputContainerStyle} className="inputForm">
          <label style={labelStyle} htmlFor="memberPassword" className="inputTitle">
            <span style={labelKorStyle}>비밀번호</span>
            <span style={labelEngStyle}>Password</span>
          </label>
          <form>
            <input style={inputStyle} type="password" id="memberPassword" name="memberPassword" onChange={handleInputChange} autoComplete="off" />
            <span style={noticeStyle}>
              {passwordValid ? '사용가능한 비밀번호 입니다' : '영어, 숫자, 특수문자 포함한 8글자 이상이어야 합니다'}
            </span>
          </form>
        </div>
        <div style={buttonContainerStyle}>
          <button button style={signupButtonStyle} onClick={handleForSubmit}>회원가입</button>
        </div>

      </div>
    </div>
  );
}

export default SignUp;