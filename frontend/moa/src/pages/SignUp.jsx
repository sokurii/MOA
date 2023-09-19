import React from 'react';
import BackButton from '../components/BackButton';
import MainButton from '../components/MainButton';

function SignUp(props) { 
  return (
    <div>
      <p>SignUp Page</p>
      <div className='signUpContainer'>
        <div>
          <label htmlFor="" className="inputTitle">나는</label>
          <input type="radio" id="foreigner" name="foreigner"/>외국인
          <input type="radio" id="korean" name="korean"/>한국인
        </div>

        <div className="inputForm">
          <label htmlFor="name" className="inputTitle">이름</label>
          <input type="text" id="name" name="name"/>
        </div>

        <div className="inputForm">
          <label htmlFor="region" className="inputTitle">국적</label>
          <select name="region">
            <option value="한국">한국</option>
            <option value="미국">미국</option>
          </select>
        </div>

        <div className="inputForm">
          <label htmlFor="gender" className="inputTitle">성별</label>
          <input type="radio" id="man" name="man"/>남자
          <input type="radio" id="woman" name="woman"/>여자
        </div>

        <div className="inputForm">
          <label htmlFor="email" className="inputTitle">이메일</label>
          <input type="text" id="email" name="email"/>
        </div>
        <button onClick="takeTarget()">인증번호 전송</button>
        {/* 타이머 구현 전 */}
        <span>
          <span id="min">3</span> : 
          <span id="sec">00</span>
        </span>

        <div className="inputForm">
          <label htmlFor="password" className="inputTitle">비밀번호</label>
          <input type="password" id="password" name="password"/>
        </div>

        <MainButton text="회원가입" to="/intro" />
      </div>
      
      <BackButton />
    </div>
  );
}

export default SignUp;