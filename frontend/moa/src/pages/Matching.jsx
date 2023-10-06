import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import store, { useAppDispatch, useAppSelector, setIsMatching } from '../store';
import Swal from "sweetalert2";
import { matchingApi } from "../api/matchingApi";

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

  // 버디 가입 정보
  const [selectedInterest, setSelectedInterest] = useState([]);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedNation, setSelectedNation] = useState(null);

  const [buddyId, setBuddyId] = useState(null);

  const [isAlert, setIsAlert] = useState(false);

  if (!isAlert) {
    setIsAlert(true);
    Swal.fire({
      icon: 'warning',
      text: '버디를 매칭해주세요!',
      confirmButtonColor: '#CBDCFD',
    }); 
  }

  useEffect(() => {
    if (currentStep === 4) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 5000);
    }
  }, [currentStep]);

  const handleStartClick = () => {
    console.log(isForeigner);
    setCurrentStep(isForeigner == "true" ? 2 : 1);
  };

  useEffect(() => {
    console.log("선호성별 " + selectedGender);
  }, [selectedGender]);

  useEffect(() => {
    console.log("관심사 " + selectedInterest);
  }, [selectedInterest]);

  useEffect(() => {
    console.log("관심 나라 " + selectedNation);
  }, [selectedNation]);

  const steps = [
    <MatchingIntro />,
    <KoreanBuddy setSelectedNation={ setSelectedNation} />,
    <BuddyInterest setSelectedInterest={ setSelectedInterest} />,
    <BuddyGender setSelectedGender={ setSelectedGender} />,
    <LoadingMatching />,
    <SuccessMatching buddyId={ buddyId} />,
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

  const dispatch = useAppDispatch();
  const handleMatching = () => {
    if (isForeigner == "false") {
      const data = {
        nationCode: selectedNation,
        interest: selectedInterest, 
        gender: selectedGender
      }
      console.log(data);
      matchingApi.koreanInfo((data)).then((response) => {
        console.log(response);
        matchingApi.matching().then((response) => {
          console.log(response);
          dispatch(setIsMatching("true"));
          setBuddyId(response.data.response);
          setCurrentStep(currentStep + 1);
        })
        .catch((error) => {
          console.log('버디 매칭 오류 발생');
          console.log(error);
        })
      })
        .catch((error) => {
          console.log('버디 매칭 오류 발생');
          console.log(error);
        })
    }
    else {
      matchingApi.matching().then((response) => {
        console.log(response);
        dispatch(setIsMatching(true));
        setBuddyId(response.data.response);
        setCurrentStep(currentStep + 1);
      })
      .catch((error) => {
        console.log('버디 매칭 오류 발생');
        console.log(error);
      })
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
                  <ConfirmButton text='매칭하기' onClick={handleMatching} />
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
