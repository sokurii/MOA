import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import store from '../store';

import ProgressBar from "../components/Matching/ProgressBar";
import ConfirmButton from "../components/Buttons/ConfirmButton";

import MatchingIntro from "../components/Matching/MatchingIntro";
import BuddyInterest from "../components/Matching/BuddyInterest";
import BuddyGender from "../components/Matching/BuddyGender";
import LoadingMatching from "../components/Matching/LoadingMatching";
import SuccessMatching from "../components/Matching/SuccessMatching";
import KoreanBuddy from "../components/Matching/KoreanBuddy";

const state = store.getState();

const matchingStyle = {
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  height: '100vh',
  background: 'radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(238, 249, 215, 1) 48%, rgba(255, 255, 255, 0) 100%)',
};

const buttonContainerStyle = {
  display: 'flex',
  margin: '20px 0',
};

const buttonStyle = {
  background: 'linear-gradient(104deg, #C4DD7C 0%, #A6CC38 100%)',
  color: 'white',
  fontSize: '20px',
  fontWeight: '700',
  width: '100%',
  border: 'none',
  borderRadius: '18px',
  margin: '20px 10px',
  padding: '12px 0',
};

function Matching() {
  const isForeigner = state.isForeigner;
  // console.log(isForeigner);

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep === 4) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 5000);
    }
  }, [currentStep]);

  const handleStartClick = () => {
    setCurrentStep(isForeigner ? 2 : 1);
  };

  const steps = [
    <MatchingIntro />,
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
    alignItems: 'center',
    flex: '1',
    transition: "transform 0.3s ease-in-out",
    transform: `translateX(${translateValue}%)`,
  }

  const stepStyle = {
    flex: '0 0 100%',
    width: "100%",
    flexShrink: '0',
    // alignItems: 'center',
  }


  return (
    <div style={matchingStyle}>
      {/* 외국인 관심사 등록일 경우 KoreanBuddy 컴포넌트가 안나옴*/}

      {currentStep === 0 || currentStep === 4 || currentStep === 5 ? null : <ProgressBar />}

      <div style={stepsStyle}>
        {steps.map((step, index) => {
          return (
            <div key={index} style={stepStyle}>
              {step}
            </div>
          );
        })}
      </div>
      <div style={buttonContainerStyle}>
        {(() => {
          switch (currentStep) {
            case 0:
              return (
                <ConfirmButton text='시작하기' onClick={handleStartClick} />
              );

            case 1:
              return (
                <ConfirmButton text='다음단계' onClick={handleNextClick} />
              );
            
            case 2:
              if (isForeigner) {
                return (
                  <ConfirmButton text='다음단계' onClick={handleNextClick} />
                );
              }
              return (
                <>
                  <ConfirmButton text='이전단계' onClick={handlePrevClick} />
                  <ConfirmButton text='다음단계' onClick={handleNextClick} />
                </>
              );

            case 3:
              return (
                <>
                  <ConfirmButton text='이전단계' onClick={handlePrevClick} />
                  <ConfirmButton text='매칭하기' onClick={handleNextClick} />
                </>
              )

            case 4 || 5:
              return null
          }
        })()}
      </div>
    </div>
  );
}

export default Matching;
