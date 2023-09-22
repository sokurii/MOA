import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/userApi';
import BackButton from '../components/BackButton';

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
        navigate('/matching', {
          state: { isForeigner },
        });
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
    <div>
      <p>SignUp Page</p>
      <div className='signUpContainer'>
        <div>
          <label htmlFor="" className="inputTitle">나는</label>
          <input type="radio" id="foreigner" name="memberIsForeigner" value="true"/>외국인
          <input type="radio" id="korean" name="memberIsForeigner" value="false"/>한국인
        </div>

        <div className="inputForm">
          <label htmlFor="memberName" className="inputTitle">이름</label>
          <input type="text" id="memberName" name="memberName" onChange={handleInputChange}/>
        </div>

        <div className="inputForm">
          <label htmlFor="nationName" className="inputTitle">국적</label>
          <select name="nationName" onChange={handleInputChange}>
            {nations.map((nation) => (
              <option key={nation.nationCode} value={nation.nationName}>
                {nation.nationName}
              </option>
            ))}
          </select>
        </div>

        <div className="inputForm">
          <label htmlFor="memberGender" className="inputTitle">성별</label>
          <input type="radio" id="man" name="memberGender" value="2" onChange={handleInputChange}/>남자
          <input type="radio" id="woman" name="memberGender" value="1" onChange={handleInputChange}/>여자
        </div>

        <div className="inputForm">
          <label htmlFor="memberEmail" className="inputTitle">이메일</label>
          <input type="text" id="memberEmail" name="memberEmail" onChange={handleInputChange}/>
        </div>
        
        {/* 이메일 인증 */}
        <button onClick={handleSendVerificationCode}>인증번호 전송</button>

        {/* 인증 시 타이머*/}
        {timerStarted ? (
          <span>
            <span id="min">{Math.floor(timer / 60)}</span> :
            <span id="sec">{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}</span>
          </span>
        ) : null}
        {/* 인증 번호 입력란 */}
        {verificationSent ? (
          <div className='inputForm'>
            <label htmlFor="verificationCode" className='inputTitle'>인증번호</label>
            <input type='text' id='verificationCode' name='verificationCode' onChange={handleInputChange} />
            <button onClick={handleVerificationCode}>인증확인</button>
          </div>
        ) : null}


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