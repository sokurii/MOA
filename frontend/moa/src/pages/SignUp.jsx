import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/userApi';
import BackButton from '../components/BackButton';
// import MainButton from '../components/MainButton';

function SignUp(props) { 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    memberEmail: '',
    memberPassword: '',
    memberName: '',
    memeberGender: 0,
    memberIsForeigner: false,
    nationName: '한국',
  });

  const [passwordValid, setPasswordValid] = useState(true); // 비밀번호 유효성
  const [timer, setTimer] = useState(180);

  useEffect(() => {
    const passwordValid = validatePassword(formData.memberPassword);
    setPasswordValid(passwordValid);
  }, [formData.memberPassword])

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

  // 타이머 
  const handleSendVerificationCode = () => {
    // 인증번호 전송 처리 코드 추가해야 함
    // 인증번호 전송 후 타이머 시작해야 함
    startTimer()
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer -1);
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, 180000);
  }

  const handleForSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await userApi.signUp(formData);

      if (response.data.success) {
        console.log('회원가입 성공', response);
        alert('회원가입 성공!');
        navigate('/intro');
      } else {
        console.log('회원가입 오류: ', response.data.error.message);
      }
    } catch(error){
      console.error('API Request Error:', error);
    }
  };


  return (
    <div>
      <p>SignUp Page</p>
      <div className='signUpContainer'>
        <div>
          <label htmlFor="" className="inputTitle">나는</label>
          <input type="radio" id="foreigner" name="memberIsForeigner" value="true"/>외국인
          <input type="radio" id="korean" name="memberIsForeingner" value="false"/>한국인
        </div>

        <div className="inputForm">
          <label htmlFor="memberName" className="inputTitle">이름</label>
          <input type="text" id="memberName" name="memberName" onChange={handleInputChange}/>
        </div>

        <div className="inputForm">
          <label htmlFor="nationName" className="inputTitle">국적</label>
          <select name="nationName" onChange={handleInputChange}>
            <option value="한국">한국</option>
            <option value="미국">미국</option>
          </select>
        </div>

        <div className="inputForm">
          <label htmlFor="memberGender" className="inputTitle">성별</label>
          <input type="radio" id="man" name="memberGender" value="0" onChange={handleInputChange}/>남자
          <input type="radio" id="woman" name="memberGender"value="1"onChange={handleInputChange}/>여자
        </div>

        <div className="inputForm">
          <label htmlFor="memberEmail" className="inputTitle">이메일</label>
          <input type="text" id="memberEmail" name="memberEmail" onChange={handleInputChange}/>
        </div>
        <button onClick={handleSendVerificationCode}>인증번호 전송</button>
        
        {/* 타이머 구현 전 */}
        <span>
          <span id="min">{Math.floor(timer / 60)}</span> : 
          <span id="sec">{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</span>
        </span>
        {/* 인증번호 입력란 */}
        <p>인증번호 입력란 만들어야 함!</p>

        <div className="inputForm">
          <label htmlFor="memberPassword" className="inputTitle">비밀번호</label>
          <form>
            <input type="password" id="memberPassword" name="memberPassword" onChange={handleInputChange} autoComplete="off" />
            <p>
              {passwordValid ? '사용가능한 비밀번호 입니다' : '영어, 숫자, 특수문자 포함한 8글자 이상이어야 합니다'}
            </p>
          </form>
        </div>

        <button onClick={handleForSubmit}>회원가입</button>

      </div>
      
      <BackButton />
    </div>
  );
}

export default SignUp;