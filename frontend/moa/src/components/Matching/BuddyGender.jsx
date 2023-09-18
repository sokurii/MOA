import React from "react";
import GenderButton from "./GenderButton";

function BuddyGender(){
  return(
    <>
      <div>
        <h3>원하는 버디의 성별을 선택하세요</h3>
        <div><GenderButton gender="동성친구가 좋아요" /></div>
        <div><GenderButton gender="상관 없어요" /></div>
      </div>
    </>
  );
};

export default BuddyGender;