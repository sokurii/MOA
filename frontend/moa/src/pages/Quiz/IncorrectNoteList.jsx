import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { quizApi } from '../../api/quizApi';
import styles from '../../styles/Quiz/WordQuiz.module.css';
import MenuHeader from '../../components/ETC/MenuHeader';
import Modal from 'react-bootstrap/Modal';
// import IncorrectNoteListItem from './IncorrectNoteListItem';

function IncorrectNoteList() {
  // const location = useLocation(); 나중 
  // const { myQuizCnt } = location.state || {}; 나중

  const [quizData, setQuizData] = useState([]);
  const [currentQuizIndex, setCurrentQuizindex] = useState(0);
  const currentQuiz = quizData[currentQuizIndex];

  const [voices, setVoices] = useState([]);
  const [isListening, setIsListening] = useState(false);

  const [sentence, setSentence] = useState([]);

  const [showResultButton, setShowResultButton] = useState(false);
  const [answerMessage, setAnswerMessage] = useState('');
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const [isButtonSelected, setIsButtonSelected] = useState(null);

  // 단어퀴즈 버튼
  const handleButtonClick = (answer,index) => {
    checkAnswer(answer,index)
    setIsButtonSelected(index)
  };
  // 문장퀴즈 버튼
  const handleCheckClick = (answer) => {
    setSentence([...sentence, answer])
  };
  // 문장퀴즈 초기화
  const handleResetButton = () => {
    setSentence([]);
  }

  // 문제 삭제
  const handleExcludeButtonClick = async () => {
    try {
      const response = await quizApi.deleteWrongAnswer(currentQuiz.quizId);
      console.log('퀴즈 삭제 응답', response.data);
      // 이후에 필요한 로직을 추가하세요.
    } catch (error) {
      console.error('퀴즈 삭제 API 호출 중 에러:', error);
    }
  }


  // 정답 확인 함수
  const checkAnswer = async (userAnswer) => {
    try {
      let quizSubmitAnswer = '';

      if (currentQuiz.quizCategoryId === 1 || currentQuiz.quizCategoryId === 2) {
        quizSubmitAnswer = userAnswer; 
      } else if (currentQuiz.quizCategoryId === 3 || currentQuiz.quizCategoryId === 4) {
        quizSubmitAnswer = sentence.join(' ');
      }

      const response = await quizApi.submitAnswer({
        quizId: currentQuiz.quizId,
        quizSubmitAnswer: quizSubmitAnswer,
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
      }, 1500);

      if (currentQuiz.quizCategoryId === 3 || currentQuiz.quizCategoryId === 4) {
        setSentence([]);
      }
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

  // 틀린문제 퀴즈 가져오기
  useEffect(() => {
      const updateMyQuiz = async () => {
        try {
          const response = await quizApi.getRandomWrongAnswer({quizWrongCount: 10})
          // const response = await quizApi.getRandomWrongAnswer({quizWrongCount: myQuizCnt}) 나중
          // console.log('다시 풀 문제:', response.data.response);
          setQuizData(response.data.response);
        } catch(error){
          console.error('풀 문제 수 업데이트 중 에러', error);
        }
      };
      // updateMyQuiz();

      if (quizData.length === 0) {
        updateMyQuiz();
      }
  },[]);

  // console.log(quizData[currentQuizIndex])
  // },[myQuizCnt]) 나중

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
      speech(currentQuiz.quizQuestion);
    } else {
      window.speechSynthesis.cancel();
    }
  };


  return (
    <div>
      <MenuHeader title="다시풀기"/>
      {quizData.length > 0 ? (
        <div>
          {currentQuiz.quizCategoryId === 1 ? (
            <div>
              <p className={styles.quizTitle}>{currentQuizIndex + 1}. 다음 단어의 뜻을 맞혀보세요</p>
              <div className={styles.questionContainer}>
                <div className={styles.questionArea}>
                  <p>{currentQuiz.quizQuestion}</p>
                </div>
              </div>
            </div>
          ) : currentQuiz.quizCategoryId === 2 ? (
            <div>
              <p className={styles.quizTitle}>{currentQuizIndex + 1}. 다음 단어를 듣고 맞혀보세요</p>
              <div className={styles.questionContainer}>

                <div onClick={toggleListening}
                className={styles.questionArea}>
                  <img src={process.env.PUBLIC_URL + '/assets/Quiz/quizSound.png'} 
                  alt="듣기" /> 
                </div>
              </div>
            </div>
          ) : currentQuiz.quizCategoryId === 3 ? (
            <div>
              <p className={styles.quizTitle}>{currentQuizIndex + 1}. 다음 문장을 해석하고 완성해보세요</p>
              <div className={styles.questionContainer}>
                <div className={styles.sentenceArea}>
                  <p>{currentQuiz.quizQuestion}</p>
                </div>
              </div>
            </div>  
          ) : currentQuiz.quizCategoryId === 4 ? (
            <div>
              <p className={styles.quizTitle}>{currentQuizIndex + 1}. 다음을 듣고 문장을 완성해보세요</p>
              <div className={styles.questionContainer}>
                <div onClick={toggleListening}
                  className={styles.sentenceArea}>
                  <img src={process.env.PUBLIC_URL + '/assets/Quiz/quizSound.png'} 
                  alt="듣기" /> 
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          
          {currentQuiz.quizCategoryId === 1 || currentQuiz.quizCategoryId === 2 ? (
            <ul className={styles.quizUl}>
            {currentQuiz.quizAnswerList.map((answer,answerIndex) =>(
              <button 
                key = {answerIndex}
                onClick={() => handleButtonClick(answer,answerIndex)}
                className={`${styles.selectBtn} ${isButtonSelected === answerIndex ? styles.selected : ''}`}
              >
                {answer}
              </button>
              ))}
            </ul>
            ) : (
            <div>
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
                {currentQuiz.quizAnswerList.map((answer, answerIndex) => (
                  <button
                    key={answerIndex}
                    onClick={() => handleCheckClick(answer)}
                    className={`${styles.selectBtns} ${sentence.includes(answer) ? styles.selected :''}`}
                    >
                    {answer}
                  </button>
                ))}
              </ul>
            </div>
            )}
        </div>


      ) : (
        <p>Loading...</p>
      )}

      <Modal show={showAnswerModal} className={styles.resultModal}>
        <Modal.Body className={styles.resultModalContent}>        
          {answerMessage === '맞았어요!' ? (
            <div className={styles.correctMessage}>
              <img src={process.env.PUBLIC_URL + '/assets/Quiz/success.png'} alt="듣기" /> 
              <p>맞았어요!</p>
              <button onClick={handleExcludeButtonClick}>다시풀기에서 제외</button>
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

export default IncorrectNoteList;