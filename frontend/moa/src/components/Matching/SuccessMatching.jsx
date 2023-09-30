import React from "react";
import { useNavigate } from "react-router";

import ConfirmButton from "../ConfirmButton";

function SuccessMatching(){
  const navigate = useNavigate();

  const goToBuddyTalk = () => {
    navigate('/chatting/buddy');
  };

  const goToMain = () => {
    navigate('/');
  };

  return(
    <>
      <span>축하해요! 나와 맞는 버디를 발견했어요</span>
      <ConfirmButton text="버디와 인사하기" onClick={goToBuddyTalk}/>
      <ConfirmButton text="메인화면으로 가기" onClick={goToMain}/>
    </>
  );
};

export default SuccessMatching;