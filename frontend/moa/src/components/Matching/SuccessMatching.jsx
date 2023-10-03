import React from "react";
import { useNavigate } from "react-router";

import ConfirmButton from "../Buttons/ConfirmButton";

const successStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  flexDirection: 'column',
  padding: '10px 30px',
};

const noticeStyle = {
  margin: '20px 0',
  fontSize: '24px',
  fontWeight: '700',
};

const imageContainerStyle = {
  margin: '70px 0',
};

const imageStyle = {
  height: '250px',
};

function SuccessMatching(){
  const navigate = useNavigate();

  const goToBuddyTalk = () => {
    navigate('/chatting/buddy');
  };

  const goToMain = () => {
    navigate('/');
  };

  return(
    <div style={successStyle}>
      <div style={noticeStyle}>
        <span>
          축하해요!
          <br />
          나와 맞는 버디를
          <br />
          발견했어요
        </span>
      </div>
      <div style={imageContainerStyle}>
        <img 
          style={imageStyle}
          src={process.env.PUBLIC_URL + '/assets/Matching/Cat.png'}
          alt="고양이"
        />
      </div>
      <div>
        <ConfirmButton text="버디와 인사하기" onClick={goToBuddyTalk}/>
        <ConfirmButton text="메인화면으로 가기" onClick={goToMain}/>
      </div>
    </div>
  );
};

export default SuccessMatching;