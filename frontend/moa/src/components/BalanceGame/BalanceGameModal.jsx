import React, { useState, useEffect } from 'react';

import BalanceGameResult from './BalanceGameResult';
import BuddyChatArea from './BuddyChatArea';
import ProgressBar from './ProgressBar';

function BalanceGameModal({ balanceGameId, balanceGameList, time }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [remainingTime, setRemainingTime] = useState(time);
  const [progress, setProgress] = useState(100);
  const [leftButtonActive, setLeftButtonActive] = useState(false);
  const [rightButtonActive, setRightButtonActive] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]); // 선택한 옵션을 저장하는 배열

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

  return (
    <div>
      {!showResult ? (
        <div>
          <div>
            <div>
              <h4>Round {balanceGameList[currentIndex].balanceOrder}</h4>
              <p>{balanceGameList[currentIndex].balanceOrder} / {balanceGameList.length}</p>
            </div>
            <ProgressBar
              remainingTime={remainingTime}
              progress={progress}
            />
            <div>
              <div>
                <button onClick={handleLeftButtonClick} style={{ backgroundColor: leftButtonActive ? 'green' : 'gray', color: 'white' }}>
                  {balanceGameList[currentIndex].balanceGameOne}
                </button>
              </div>
              <div><h5>vs</h5></div>
              <div>
                <button onClick={handleRightButtonClick} style={{ backgroundColor: rightButtonActive ? 'green' : 'gray', color: 'white' }}>
                  {balanceGameList[currentIndex].balanceGameTwo}
                </button>
              </div>
              {currentIndex === balanceGameList.length - 1 ? (
                <button onClick={() => { handleOptionSelect(); handleNextClick(); }}>결과 확인</button>
              ) : (
                <button onClick={() => { handleOptionSelect(); handleNextClick(); }}>Next</button>
              )}
            </div>
          </div>
          <BuddyChatArea />
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