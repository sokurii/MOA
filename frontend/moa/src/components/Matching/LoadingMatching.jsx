import React from "react";

const loadingStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 30px',
};

const introduceStyle = {
  textAlign: 'left',
  fontSize: '24px',
  fontWeight: '700',
  marginBottom: '500px',
};

const introduceKorStyle = {

};

const introduceEngStyle = {
  fontSize: '16px',
  fontWeight: '400',
};

function LoadingMatching(){
  return(
    <div style={loadingStyle}>
      <div style={introduceStyle}>
        <div style={introduceKorStyle}>
          <span>버디 매칭중...</span>
        </div>
        <span style={introduceEngStyle}>잠시만 기다려 주세요!</span>
      </div>
    </div>
  );
};

export default LoadingMatching;