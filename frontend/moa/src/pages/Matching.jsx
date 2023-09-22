import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import ConfirmButton from "../components/ConfirmButton";
import BuddyInterest from "../components/Matching/BuddyInterest";
import BuddyGender from "../components/Matching/BuddyGender";
import LoadingMatching from "../components/Matching/LoadingMatching";
import SuccessMatching from "../components/Matching/SuccessMatching";
import KoreanBuddy from "../components/Matching/KoreanBuddy";

function Matching() {
  // const location = useLocation();
  // const foreigner = location.state.isForeigner;

  // console.log(foreigner);

  const [isForeigner, setIsForeigner] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Your useEffect logic here
  }, []);

  const handleStartClick = () => {
    setCurrentStep(isForeigner ? 2 : 1);
  };

  const steps = [
    <div>
      {isForeigner ? (
        <h3>반가워요! 멋진 한국인 친구 버디를 만나보세요</h3>
      ) : (
        <h3>한국을 좋아하는 외국인 친구의 버디가 되어보세요</h3>
      )}
      <ConfirmButton text="시작하기" onClick={handleStartClick} />
    </div>,
    <KoreanBuddy />,
    <BuddyInterest />,
    <BuddyGender />,
    <LoadingMatching />,
    <SuccessMatching />,
  ];

  const handlePrevClick = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNextClick = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const translateValue = -currentStep * 100; // 슬라이딩을 위한 변환값 계산
  
  const stepsStyle = {
    display: "flex",
    transition: "transform 0.3s ease-in-out",
    width: "100%",
    transform: `translateX(${translateValue}%)`,
  }

  const stepStyle = {
    flex: "0 0 100%",
  }


  return (
    <>
      <div>매칭 페이지</div>
      {/* 외국인 관심사 등록일 경우 KoreanBuddy 컴포넌트가 안나옴*/}

      <div style={stepsStyle}>
        {steps.map((step, index) => {
          return (
            <div key={index} style={stepStyle}>
              {step}
            </div>
          );
        })}
      </div>
      {currentStep > 1 && !(isForeigner && currentStep === 2) ? <button onClick={handlePrevClick}>이전 단계</button> : null}
      {currentStep && currentStep < steps.length - 1 ? <button onClick={handleNextClick}>다음 단계</button> : null}
    </>
  );
}

export default Matching;
