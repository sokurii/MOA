import React, { useState, useEffect } from 'react';

import MenuHeader from '../ETC/MenuHeader';
import BalanceGameResult from './BalanceGameResult';
import ProgressBar from './ProgressBar';

const balanceGamePlayStyle = {
  fontFamily: 'Ganpan',
  position: 'fixed',
  top: 0,
  right: '-100%',
  bottom: 0,
  width: '100%',
  transition: 'right 0.3s ease-in-out',
  zIndex: 999,
  backgroundImage: `
    url(${process.env.PUBLIC_URL}/assets/Background/buddy_background.png)
  `,
  backgroundSize: 'cover', // 배경 이미지 크기 조절
  backgroundRepeat: 'no-repeat', // 배경 이미지 반복 없음
  backgroundPosition: 'center', // 배경 이미지 중앙 정렬
  width: '100%', // 화면 전체 너비를 차지하도록 설정
  height: '100vh', // 화면 전체 높이를 차지하도록 설정
};

const modalOpenStyle = {
  right: 0,
};

const roundContainerStyle = {
  width: '90%',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '10px auto',
};

const roundStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50%',
  borderRadius: '20px',
  background: 'white',
  marginLeft: '95px',
  color: '#B88CD3',
  fontSize: '30px',
  fontFamily: 'Ganpan',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const buttonContainerStyle = {
  width: '90%',
  borderRadius: '18px',
  margin: '10px auto',
  background: 'white',
  padding: '0',
  display: 'flex', // 자식 요소들을 수평으로 정렬
  justifyContent: 'center', 
  alignItems: 'center',
};

const leftContainerStyle = {
  width: '45%',
};

const rightContainerStyle = {
  width: '45%',
};

const vsStyle = {
  width: '10%',
};

const vStyle = {
  color: '#E57373',
  fontFamily: 'Ganpan',
  fontSize: '20px',
  fontWeight: '400',
};

const sStyle = {
  color: '#0980D0',
  fontFamily: 'Ganpan',
  fontSize: '20px',
  fontWeight: '400',
};

const nextButtonStyle = {
  border: 'none',
  background: 'linear-gradient(184deg, #ECC2F7 7%, #B17AD3 82%)',
  width: '90%',
  fontSize: '20px',
  fontFamily: 'Ganpan',
  boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '18px',
  padding: '10px',
};

function BalanceGameModal({ balanceGameId, balanceGameList, time, isOpen }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [remainingTime, setRemainingTime] = useState(time);
  const [progress, setProgress] = useState(100);
  const [leftButtonActive, setLeftButtonActive] = useState(false);
  const [rightButtonActive, setRightButtonActive] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]); // 선택한 옵션을 저장하는 배열

  const modalStyle = isOpen ? { ...balanceGamePlayStyle, ...modalOpenStyle } : balanceGamePlayStyle;


  const handleNextClick = () => {
    if (currentIndex < balanceGameList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setRemainingTime(time);
      setProgress(100);
      setLeftButtonActive(false);
      setRightButtonActive(false);
    } else {
      setShowResult(true);
    }
  };

  const handleLeftButtonClick = () => {
    setLeftButtonActive(true);
    setRightButtonActive(false);
  };

  const handleRightButtonClick = () => {
    setLeftButtonActive(false);
    setRightButtonActive(true);
  };

  // 선택한 옵션을 배열에 추가
  const handleOptionSelect = () => {
    if (leftButtonActive) {
      setSelectedOptions([...selectedOptions, balanceGameList[currentIndex].balanceGameOne]);
    } else if (rightButtonActive) {
      setSelectedOptions([...selectedOptions, balanceGameList[currentIndex].balanceGameTwo]);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
        setProgress((remainingTime - 1) / time * 100);
      }
    }, 1000);

    if (remainingTime === 0) {
      handleNextClick();
    }

    return () => clearInterval(intervalId);
  }, [remainingTime]);

  const leftButtonStyle = {
    width: '100%',
    padding: '20px 10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    backgroundColor: leftButtonActive ? '#B88CD3' : 'transparent',
    color: leftButtonActive ? 'white' : 'black',
    textAlign: 'center',
    borderTopLeftRadius: '18px',
    borderBottomLeftRadius: '18px',
    fontSize: '20px',
    fontFamily: 'Ganpan',
  };

  const rightButtonStyle = {
    width: '100%',
    padding: '20px 10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    backgroundColor: rightButtonActive ? '#B88CD3' : 'transparent',
    color: rightButtonActive ? 'white' : 'black',
    textAlign: 'center',
    borderTopRightRadius: '18px',
    borderBottomRightRadius: '18px',
    fontSize: '20px',
    fontFamily: 'Ganpan',
  };

  return (
    <div style={modalStyle}>
      {!showResult ? (
        <div>
          <MenuHeader title='밸런스 게임' />
          <div>
            <div style={roundContainerStyle}>
              <div style={roundStyle}>
                Round {balanceGameList[currentIndex].balanceOrder}
              </div>
              <p>{balanceGameList[currentIndex].balanceOrder} / {balanceGameList.length}</p>
            </div>
            <ProgressBar
              remainingTime={remainingTime}
              progress={progress}
            />
            <div style={buttonContainerStyle}>
              <div style={leftContainerStyle}>
                <button style={leftButtonStyle} onClick={handleLeftButtonClick}>
                  {balanceGameList[currentIndex].balanceGameOne}
                </button>
              </div>
              <div style={vsStyle}>
                <span style={vStyle}>V</span>
                <span style={sStyle}>S</span>
              </div>
              <div style={rightContainerStyle}>
                <button style={rightButtonStyle} onClick={handleRightButtonClick}>
                  {balanceGameList[currentIndex].balanceGameTwo}
                </button>
              </div>
            </div>
            <div>
              {currentIndex === balanceGameList.length - 1 ? (
                <button style={nextButtonStyle} onClick={() => { handleOptionSelect(); handleNextClick(); }}>결과 확인</button>
              ) : (
                <button style={nextButtonStyle} onClick={() => { handleOptionSelect(); handleNextClick(); }}>Next</button>
              )}
            </div>
          </div>
          {/* <BuddyChatArea /> */}
        </div>
      ) : (
        <div>
          {/* BalanceGameResult에 선택한 옵션 배열을 전달 */}
          <BalanceGameResult
            balanceGameId={balanceGameId}
            selectedOptions={selectedOptions}
          />
        </div>
      )}
    </div>
  );
}

export default BalanceGameModal;