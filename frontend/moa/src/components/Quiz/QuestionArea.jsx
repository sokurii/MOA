import React, { useState, useEffect } from 'react';
import { quizApi } from '../../api/quizApi';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

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
        setAnswerMessage('정답입니다!');
      } else {
        setAnswerMessage('틀렸습니다!')
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
    } else {
      setShowResultButton(true);
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
      
      navigate('/quiz/quiz-result',{ state : correctAnswers });
    } catch (error) {
      console.error('퀴즈 완료 API 호출 중 에러:', error);
    }
  }



  return (
    <div>
      {currentQuiz ? (
        <div>
          <h1>
            문제 {currentQuizIndex + 1} 번 
          </h1>
          {currentQuiz.quizCategoryId === 2 ? (
            <div>
              <p>다음 단어를 듣고 맞춰보세요</p>
              <button onClick={toggleListening}>
                {isListening ? "듣기 중지" : "듣기"}
              </button>
            </div>
          ) : (
            <div>
              <p>다음 단어의 뜻을 맞춰보세요</p>
              <h1>{currentQuiz.quizQuestion}</h1> 
            </div>
          )}
          <ul>
            {currentQuiz.quizAnswerList.map((answer,answerIndex) =>(
              <button 
                key = {answerIndex}
                onClick={() => {
                  checkAnswer(answer);
                }}
                disabled={isCorrect !== null}
              >
                {answer}
              </button>
            ))}
          </ul>
          {showResultButton ? (
            <button onClick={handleShowResult}>결과보기</button>
          ) : (
            <div></div>
          )}
        </div>
      ) : (
        <p>로딩중...</p>
      )}

      <Modal show={showAnswerModal} >
        <Modal.Body>{answerMessage}</Modal.Body>

      </Modal>
    </div>
  );
}

export default QuestionArea;
