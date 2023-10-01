import React from "react";

const genderButtonStyle = {
  fontSize: '18px',
  fontWeight: '700',
  width: '100%',
  height: '200px',
  margin: '5px',
  border: 'none',
  borderRadius: '15px',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
};

const imageContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '20px',
};

const imageStyle = {
  height: '120px',
  width: '120px',
};

function GenderButton({ gender, selected, onClick }){
  const buttonStyle = {
    ...genderButtonStyle,
    background: selected ? 'linear-gradient(104deg, #C4DD7C 0%, #A6CC38 100%)' : 'white',
    color: selected ? 'white' : '#92BB69',
  };

  return (
    // 성별 선택
    <button style={buttonStyle} onClick={() => onClick(gender)}>
      <div style={imageContainerStyle}>
        {gender === "동성 친구" ? (
          <img
            style={imageStyle}
            src={process.env.PUBLIC_URL + '/assets/Matching/Gender1.png'}
            alt="사진"
          />
        ) : (
          <img
            style={imageStyle}
            src={process.env.PUBLIC_URL + '/assets/Matching/Gender2.png'}
            alt="사진"
          />
        )
        }
      </div>
      <div>
        {gender}
      </div>
    </button>
  );
};

export default GenderButton;