import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { userApi } from '../api/userApi';
import Cookies from 'js-cookie';

import { useAppDispatch } from '../store'; // useDispatch를 사용하는 부분을 변경
import { setAccessToken } from '../store';

function Intro(props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  return (
    <div>
      <p>
        Intro Page
      </p>

      <div>
        <Link to="/login">
          <button>로그인</button>
        </Link>
        <Link to="/signup">
          <button>회원가입</button>
        </Link>
      </div>
      
      {/* 메인페이지 이동을 위해 임시로 만든 버튼 */}
      <div>
        <Link to="/">
          <button>메인페이지로 이동</button>
        </Link>
      </div>
    </div>
  );
}

export default Intro;