import React, { useState, useEffect } from 'react';
import { quizApi } from '../../api/quizApi';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import MenuHeader from '../ETC/MenuHeader';
import styles from '../../styles/Quiz/WordQuiz.module.css'
// import TimeBar from './TimeBar';

function QuestionArea(props) {
  const [quizData, setQuizData] = useState([]);
  const [currentQuizIndex, setCurrentQuizindex] = useState(0);
  const [voices, setVoices] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [showResultButton, setShowResultButton] = useState(false);

  const [answerMessage, setAnswerMessage] = useState('');
  const [showAnswerModal, setShowAnswerModal] = useState(false);

  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);


  const [isButtonSelected, setIsButtonSelected] = useState(null);

  const handleButtonClick = (answer,index) => {
    checkAnswer(answer,index)
    setIsButtonSelected(index);
  }

  useEffect(() => {
    // 퀴즈 데이터 가져오기
    const fetchQuizData = async () => {
      try {
        const response = await quizApi.getWordQuiz(); 
        setQuizData(response.data.response); 
      } catch (error) {
        console.error('퀴즈 데이터 가져오는 중 에러 발생:', error);
      }
    };

    // 배열이 비어있을 때만 데이터를 가져오는 조건 
    if (quizData.length === 0 && !showResultButton) {
      fetchQuizData();
    }
  },[quizData, showResultButton]); // 퀴즈가 바뀔 때만

  // TTS 
  useEffect(() => {
    const setVoiceList = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = setVoiceList;
    }

    setVoiceList();
  }, []);


  const speech = (text) => {
    const lang = "ko-KR";
    let utterThis = new SpeechSynthesisUtterance(text);

    utterThis.lang = lang;
    utterThis.rate = 0.8;

    const korVoice = voices.find(
      (elem) => elem.lang === lang || elem.lang === lang.replace("-","_")
    );

    if (korVoice) {
      utterThis.voice = korVoice;
      window.speechSynthesis.speak(utterThis);
    } else {
      console.error("한국어 음성 데이터를 찾을 수 없습니다.")
    }
  };

  // 정답 확인 함수
  const checkAnswer = async (userAnswer) => {
    try {
      const response = await quizApi.submitAnswer({
        quizId: currentQuiz.quizId,
        quizSubmitAnswer: userAnswer, 
      });

      const isAnswerCorrect = response.data.response.isQuizCorrect;

      if (isAnswerCorrect){
        setCorrectAnswers(correctAnswers + 1);
        setAnswerMessage('맞았어요!');
      } else {
        setAnswerMessage('틀렸어요!')
      }

      setShowAnswerModal(true);

      setTimeout(() => {
        setShowAnswerModal(false);
        handleNextQuiz();
      }, 1000)

      setIsCorrect(isAnswerCorrect);
    } catch (error) {
      console.error('정답 확인 중 에러 발생 :', error);
    }
  }

  // 한 문제씩 가져오는 함수
  const handleNextQuiz = () => {
    if (currentQuizIndex < quizData.length - 1) {
      setCurrentQuizindex(currentQuizIndex + 1);
      setIsListening(false); 
      setIsCorrect(null); 
      setIsButtonSelected(null);
    } else {
      setShowResultButton(true);
      setIsButtonSelected(null);
      handleShowResult();
    }
  }; 

  const currentQuiz = quizData[currentQuizIndex];

  // TTS 
  const toggleListening = () => {
    setIsListening(!isListening);

    if (!isListening) {
      speech(currentQuiz.quizQuestion);
    } else {
      window.speechSynthesis.cancel();
    }
  };

  // 결과
  // const location = useLocation();
  const navigate = useNavigate();
  const handleShowResult = async() => {
    try {
      const response = await quizApi.finishQuiz({
        correctQuizAnswerCnt : correctAnswers,
      });
      console.log('퀴즈 완료 응답', response.data);

      const quizMessage = response.data.response.quizMessage;
      
      navigate('/quiz/quiz-result',{ state : {correctAnswers, quizMessage} });
    } catch (error) {
      console.error('퀴즈 완료 API 호출 중 에러:', error);
    }
  }



  return (
    <div>
      <MenuHeader title="단어퀴즈"/>
      {currentQuiz ? (
        <div>
          {/* <TimeBar totalTime={15} /> */}
          {currentQuiz.quizCategoryId === 2 ? (
            <div>
              <p className={styles.quizTitle}>{currentQuizIndex + 1}. 다음 단어를 듣고 맞혀보세요</p>
              <div className={styles.questionContainer}>

                <div onClick={toggleListening}
                className={styles.questionArea}>
                  <img src={process.env.PUBLIC_URL + '/assets/Quiz/quizSound.png'} 
                  alt="듣기" /> 
                  {/* <p>{isListening ? "듣기 중지" : "듣기"}</p> */}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className={styles.quizTitle}>{currentQuizIndex + 1}. 다음 단어의 뜻을 맞혀보세요</p>
              <div className={styles.questionContainer}>
                <div className={styles.questionArea}>
                  <p>{currentQuiz.quizQuestion}</p>
                </div>
              </div>
            </div>
          )}
          <ul className={styles.quizUl}>
            {currentQuiz.quizAnswerList.map((answer,answerIndex) =>(
              <button 
                key = {answerIndex}
                onClick={() => handleButtonClick(answer,answerIndex)}
                // disabled={isCorrect !== null}
                className={`${styles.selectBtn} ${isButtonSelected === answerIndex ? styles.selected : ''}`}
              >
                {answer}
              </button>
            ))}
          </ul>
          {/* {showResultButton ? (
            <button onClick={handleShowResult}>결과보기</button>
          ) : (
            <div></div>
          )} */}
        </div>
      ) : (
        <p>로딩중...</p>
      )}

      <Modal show={showAnswerModal} className={styles.resultModal}>
          <Modal.Body className={styles.resultModalContent}>        
            {answerMessage === '맞았어요!' ? (
              <div className={styles.correctMessage}>
                <img src={process.env.PUBLIC_URL + '/assets/Quiz/success.png'} alt="듣기" /> 
                <p>맞았어요!</p>
              </div>
            ):(
              <div className={styles.incorrectMessage}>
                <img src={process.env.PUBLIC_URL + '/assets/Quiz/fail.png'} alt="듣기" /> 
                <p>틀렸어요</p>
              </div>
            )}
          </Modal.Body>
      </Modal>
    </div>
  );
}

export default QuestionArea;
