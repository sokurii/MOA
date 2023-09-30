import React from "react";
import SelectButton from "./SelectButton";

const buddyInterestStyle = {
  display: 'flex',
  flexDirection: 'column',
};

const introduceStyle = {

};

const introduceKorStyle = {

};

const introduceEngStyle = {

};

const selectButtonContainerStyle = {
  display: 'flex',
};

const selectLeftStyle = {

};

const selectRightStyle = {

};

function BuddyInterest(){
  return(
    <div style={buddyInterestStyle}>
      <div style={introduceStyle}>
        <div style={introduceKorStyle}>
          <span>
            관심사에 따라 
            <br />
            버디를 만나요
          </span>
        </div>
        <span style={introduceEngStyle}>Choose your interests</span>
      </div>
      <div>
        <span>관심사를 최소 3개 이상 선택하세요</span>
      </div>
      <div style={selectButtonContainerStyle}>
        <div style={selectLeftStyle}>
          <SelectButton text="음악" />
          <SelectButton text="영화" />
          <SelectButton text="사회" />
          <SelectButton text="운동" />
          <SelectButton text="게임" />
        </div>
        <div style={selectRightStyle}>
          <SelectButton text="드라마" />
          <SelectButton text="미술" />
          <SelectButton text="경제" />
          <SelectButton text="스포츠" />
          <SelectButton text="요리" />
        </div>
      </div>
    </div>
  );
}

export default BuddyInterest;