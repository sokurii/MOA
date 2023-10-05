import { useState, useEffect } from "react";
import React from "react";
import { quizApi } from "../../api/quizApi";
import { useNavigate } from "react-router-dom";
import MenuHeader from "../../components/ETC/MenuHeader";
import styles from '../../styles/Quiz/WordQuiz.module.css';
import Modal from 'react-bootstrap/Modal';
import TimeBar from "../../components/Quiz/TimeBar";

function SentenceQuiz(props) {
  const [sentenceData, setSentenceData] = useState([]);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [showResultButton, setShowResultButton] = useState(false);
  
  const [voices, setVoices] = useState([]);
  const [isListening, setIsListening] = useState(false);
  
  const [sentence, setSentence] = useState([]);
  
  const [answerMessage, setAnswerMessage] = useState('');
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswers,setCorrectAnswers] = useState(0);

  const [timeBarTotalTime, setTimeBarTotalTime] = useState(20);
  const [isTimeOut, setIsTimeOut] = useState(false);

  const currentSentence = sentenceData[sentenceIndex];

  // const handleTimeup = () => {
  //   checkAnswer();
  // }

  const handleButtonClick = (answer) => {
    setSentence([...sentence, answer])
  };

  const handleResetButton = () => {
    setSentence([]);
  }

  useEffect(()=>{
    const fetchSentenceData = async () => {
      try {
        const response = await quizApi.getSentenceQuiz();
        setSentenceData(response.data.response);
        console.log(response.data.response);
      } catch(error){
        console.error('문장 퀴즈 가져오는 중 에러 발생', error);
      }
    };

    if (sentenceData.length === 0 && !showResultButton) {
      fetchSentenceData();
    }
  },[sentenceData, showResultButton]);
  
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

  // TTS 
  const toggleListening = () => {
    setIsListening(!isListening);

    if (!isListening) {
      speech(currentSentence.quizQuestion);
    } else {
      window.speechSynthesis.cancel();
    }
  };

// 정답 확인
const checkAnswer = async () =>{
  const selectedSentence = sentence.join(' ');

  try {
    const response = await quizApi.submitAnswer({
      quizId: currentSentence.quizId,
      quizSubmitAnswer: selectedSentence, // 사용자가 제출한 정답
    });

    const isAnswerCorrect = response.data.response.isQuizCorrect;

    if (isAnswerCorrect) {
      setCorrectAnswers(correctAnswers + 1);
      setAnswerMessage('맞았어요!');
    } else {
      setAnswerMessage('틀렸어요!')
    }

    setShowAnswerModal(true);

    setTimeout(() => {
      setShowAnswerModal(false);
      handleNextQuiz();
    }, 1000);
    setSentence([]);
  } catch (error) {
    console.error('정답 확인 중 에러 발생:', error);
  }
}

  // 시간 초과 함수
  const handleTimeOut = () => {
    setIsTimeOut(true);
    setTimeout(() => {
      setIsTimeOut(false);
      handleNextQuiz();
    }, 1000);
  };

  // 한 문제씩 가져오기
  const handleNextQuiz = () => {
    if (sentenceIndex < sentenceData.length -1) {
      setSentenceIndex(sentenceIndex + 1 );
      setIsListening(false);
      setIsCorrect(null);
    } else {
      setShowResultButton(true);
      handleShowResult();
    }
  };

  // 결과
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
  
  

  return(
    <div>
      <MenuHeader title="문장퀴즈" />
      {currentSentence ? (
        <div>
          {currentSentence.quizCategoryId === 4 ? (
            <div>
              <p className={styles.quizTitle}>{sentenceIndex + 1}. 다음을 듣고 문장을 완성해보세요</p>
              <div className={styles.questionContainer}>
                <div onClick={toggleListening}
                  className={styles.sentenceArea}>
                  <img src={process.env.PUBLIC_URL + '/assets/Quiz/quizSound.png'} 
                  alt="듣기" /> 
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className={styles.quizTitle}>{sentenceIndex + 1}. 다음 문장을 해석하고 완성해보세요</p>
              <div className={styles.questionContainer}>
                <div className={styles.sentenceArea}>
                  <p>{currentSentence.quizQuestion}</p>
                </div>
              </div>
            </div>           
          )}
          <p className={styles.quizTitle}>정답을 완성하세요</p>
          <div className={styles.answerContainer}>
            <p className={styles.completeAnswer}>{sentence.join(' ')}</p>
            <div className={styles.btnContainer}>
              <button onClick={handleResetButton}>초기화</button>
              <button onClick={checkAnswer}>정답 확인</button>
            </div>
          </div>

          <p className={styles.quizTitle}>보기</p>
          <ul className={styles.sentenceQuizUl}>
            {currentSentence.quizAnswerList.map((answer, answerIndex) => (
              <button
                key={answerIndex}
                onClick={() => handleButtonClick(answer)}
                className={`${styles.selectBtns} ${sentence.includes(answer) ? styles.selected :''}`}
                >
                {answer}
              </button>
            ))}
          </ul>
          {showResultButton ? (
            <button onClick={handleShowResult} className={styles.resultBtn}>결과보기</button>
          ) : (
            <div></div>
          )}
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
      <Modal show={isTimeOut} className={styles.resultModal}>
        <Modal.Body className={styles.resultModalContent}>
          <div className={styles.incorrectMessage}>
            <img src={process.env.PUBLIC_URL + '/assets/Quiz/fail.png'} alt="시간 초과" />
            <p>시간 초과</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default SentenceQuiz;