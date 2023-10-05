import React, { useState, useEffect } from "react";
import SelectButton from "./SelectButton";

const buddyInterestStyle = {
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 30px',
};

const imageStyle = {
  marginLeft: '100px',
  position: 'absolute',
  top: '0',
  zIndex: '-1',
};

const introduceStyle = {
  textAlign: 'left',
  fontSize: '24px',
  fontWeight: '700',
  marginBottom: '50px',
};

const introduceKorStyle = {

};

const introduceEngStyle = {
  fontSize: '16px',
  fontWeight: '400',
};

const noticeStyle = {
  textAlign: 'left',
  fontWeight: '700',
};

const selectButtonContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '20px 0',
};

const selectLeftStyle = {
  marginRight: '5px',
  marginBottom: '25px',
  width: '50%',
};

const selectRightStyle = {
  marginRight: '5px',
  marginTop: '25px',
  width: '50%',
};

function BuddyInterest(props){
  const [selectedButtons, setSelectedButtons] = useState([]);

  const handleButtonClick = (number) => {
    if (selectedButtons.includes(number)) {
      // 버튼이 이미 선택된 경우 제거
      setSelectedButtons(selectedButtons.filter(item => item !== number));
    } else {
      // 버튼이 선택되지 않은 경우 추가
      setSelectedButtons([...selectedButtons, number]);
    }
  };

  useEffect(() => {
    console.log(selectedButtons)
    props.setSelectedInterest(selectedButtons);
  }, [selectedButtons])

  return(
    <div style={buddyInterestStyle}>
      <img 
        style={imageStyle}
        src={process.env.PUBLIC_URL + '/assets/Matching/Interest.png'}
        alt="사진"
      />
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
      <div style={noticeStyle}>
        <span>관심사를 최소 3개 이상 선택하세요</span>
      </div>
      <div style={selectButtonContainerStyle}>
        <div style={selectLeftStyle}>
          <SelectButton text="음악" selected={selectedButtons.includes(1)} onClick={() => handleButtonClick(1)}/>
          <SelectButton text="영화" selected={selectedButtons.includes(2)} onClick={() => handleButtonClick(2)}/>
          <SelectButton text="사회" selected={selectedButtons.includes(3)} onClick={() => handleButtonClick(3)}/>
          <SelectButton text="운동" selected={selectedButtons.includes(4)} onClick={() => handleButtonClick(4)}/>
          <SelectButton text="게임" selected={selectedButtons.includes(5)} onClick={() => handleButtonClick(5)}/>
        </div>
        <div style={selectRightStyle}>
          <SelectButton text="드라마" selected={selectedButtons.includes(6)} onClick={() => handleButtonClick(6)}/>
          <SelectButton text="미술" selected={selectedButtons.includes(7)} onClick={() => handleButtonClick(7)}/>
          <SelectButton text="경제" selected={selectedButtons.includes(8)} onClick={() => handleButtonClick(8)}/>
          <SelectButton text="스포츠" selected={selectedButtons.includes(9)} onClick={() => handleButtonClick(9)}/>
          <SelectButton text="요리" selected={selectedButtons.includes(10)} onClick={() => handleButtonClick(10)}/>
        </div>
      </div>
    </div>
  );
}

export default BuddyInterest;