import React, { useState, useEffect } from 'react';

import BalanceGameResult from './BalanceGameResult';
import BackButton from '../BackButton';
import LiveChatArea from './LiveChatArea';
import ProgressBar from './ProgressBar';

function BalanceGameModal(props) {
  const balanceGame = props.balanceGame;
  const balanceGameList = balanceGame.balanceGameList;
  const time = balanceGame.time;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [remainingTime, setRemainingTime] = useState(time);
  const [progress, setProgress] = useState(100); // 초기 프로그레스 바 값

  const handleNextClick = () => {
    if (currentIndex < balanceGameList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setRemainingTime(time); // 다음 항목으로 이동할 때 남은 시간 재설정
      setProgress(100); // 프로그레스 바 초기화
    } else {
      setShowResult(true);
    }
  };

  useEffect(() => {
    // 1초마다 남은 시간을 감소시키고 프로그레스 바 업데이트
    const intervalId = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
        setProgress((remainingTime - 1) / time * 100); // 프로그레스 바 업데이트
      }
    }, 1000);

    // 남은 시간이 0이 되면 결과 확인 버튼을 클릭한 것과 동일한 동작 수행
    if (remainingTime === 0) {
      handleNextClick();
    }

    // 컴포넌트 언마운트 시에 interval 정리
    return () => clearInterval(intervalId);
  }, [remainingTime]);

  return (
    <div>
      {!showResult ? (
        <div>
          <div>
            <h4>Round {balanceGameList[currentIndex].order}</h4>
            <ProgressBar
              remainingTime={remainingTime}
              progress={progress}
            />
            <div>
              <div>{balanceGameList[currentIndex].left}</div>
              <div><h5>vs</h5></div>
              <div>{balanceGameList[currentIndex].right}</div>
              {currentIndex === balanceGameList.length - 1 ? (
                <button onClick={handleNextClick}>결과 확인</button>
              ) : (
                <button onClick={handleNextClick}>Next</button>
              )}
            </div>
          </div>
          <LiveChatArea />
        </div>
      ) : (
        <div>
          <BalanceGameResult />
        </div>
      )}
    </div>
  );
}

export default BalanceGameModal;
