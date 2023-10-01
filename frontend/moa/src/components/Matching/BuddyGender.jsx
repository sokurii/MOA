import React, { useState } from "react";
import GenderButton from "./GenderButton";

const buddyGenderStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 30px',
};

const introduceStyle = {
  marginBottom: '80px',
  textAlign: 'left',
  fontSize: '24px',
  fontWeight: '700',
};

const introduceKorStyle = {

};

const introduceEngStyle = {
  fontSize: '16px',
  fontWeight: '400',
};

const buttonContainerStyle = {
  marginBottom: '170px',
  display: 'flex',
  justifyContent: 'space-between',
};

function BuddyGender(){
  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderClick = (gender) => {
    setSelectedGender(gender);
  };

  return(
    <div style={buddyGenderStyle}>
      <div style={introduceStyle}>
        <div style={introduceKorStyle}>
          <span>
            원하는 버디의 
            <br />
            성별을 선택하세요
          </span>
        </div>
        <span style={introduceEngStyle}>Choose your gender of BUDDY you want</span>
      </div>
      <div style={buttonContainerStyle}>
        <GenderButton gender="동성 친구" selected={selectedGender === "동성 친구"} onClick={handleGenderClick}/>
        <GenderButton gender="상관 없어" selected={selectedGender === "상관 없어"} onClick={handleGenderClick}/>
      </div>
    </div>
  );
};

export default BuddyGender;