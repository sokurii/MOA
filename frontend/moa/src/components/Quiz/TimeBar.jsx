import React, { useState, useEffect } from 'react';
import styles from "../../styles/Quiz/TimeBar.module.css";

function TimeBar({totalTime, handleTimeOut, handleNextQuiz}){
  const [currentTime, setCurrentTime] = useState(0);
  
  useEffect(()=> {
    if (currentTime < totalTime){
      const timer = setTimeout(() => {
        setCurrentTime(currentTime +1);
      }, 1000);

      return() => clearTimeout(timer);
    } else {
      handleTimeOut();
    } 
  }, [currentTime, totalTime, handleTimeOut]);

  useEffect(() => {
    setCurrentTime(0);
  }, [handleNextQuiz])
  const scale = currentTime / totalTime; // 스케일 계산

  const timeBarStyle = {
    transform: `scaleX(${scale})`, // 스케일을 적용
  };

  return(
    <div className={styles.TimeBarContainer}>
      <div
        className={styles.TimeBar}
        role='progressbar'
        style={timeBarStyle}
        aria-valuenow={currentTime}
        aria-valuemin="0"
        aria-valuemax={totalTime}
      >
      </div>
    </div>
  )


}

export default TimeBar;