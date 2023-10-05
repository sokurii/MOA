import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { matchingApi } from '../../api/matchingApi';

import ConfirmButton from "../Buttons/ConfirmButton";
import store from '../../store';
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

function SuccessMatching(props){
  const navigate = useNavigate();
 
  const state = store.getState();
  const isMatching = state.isMatching;
  const buddyId = props.buddyId;

  // useEffect (() => {
  //   matchingApi.isMatching()
  //   .then((response) => {
  //     const res = response.data.response;
  //     console.log("버디아이디 가져옴 "+res); 
  //     setBuddyId(res);
  //   })
  //   .catch((error) => {
  //     alert('매칭된 버디가 없습니다');
  //   });
  // }, [])

  const goToBuddyTalk = () => {
    console.log("성공창 매칭여부 " + isMatching);
    // if(isMatching=="true"){
    //   navigate('/chatting/buddy');
    // }
    // navigate('/');
    // setTimeout(() => {
    //   console.log("navigate전 buddyId : " + buddyId);
    //   navigate('/chatting/buddy2', {
    //     state: {
    //       buddyId,
    //     },
    //   });
    // }, 2000);

    console.log("navigate전 buddyId : " + buddyId);
      navigate('/chatting/buddy2', {
        state: {
          buddyId,
        },
      });

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