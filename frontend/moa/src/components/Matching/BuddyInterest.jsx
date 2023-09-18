import React from "react";
import SelectButton from "./SelectButton";

function BuddyInterest(){
  return(
    <>
      <div>버디 관심사 페이지</div>
      <div>진행 정도 </div>
      <h3>관심사에 따라 버디를 만나요</h3>
      <p>관심사를 최소 3개 이상 선택하세요</p>
      <div><SelectButton text="음악" /> <SelectButton text="드라마" /></div>
      <div><SelectButton text="영화" /> <SelectButton text="미술" /></div>
      <div><SelectButton text="사회" /> <SelectButton text="경제" /></div>
      <div><SelectButton text="운동" /> <SelectButton text="스포츠" /></div>
      <div><SelectButton text="게임" /> <SelectButton text="요리" /></div>
      
    </>
  );
}

export default BuddyInterest;