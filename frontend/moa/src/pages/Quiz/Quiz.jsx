// import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '../../components/AppBar';
import styles from '../../styles/Quiz/Quiz.module.css'

function Quiz(props) {
  // const [questions, setQuestions] = useState([]);

  // const makeWordQuiz = (() => {
  //   // 단어 퀴즈 질문을 생성하는 논리를 작성하세요.
  // });

  // useEffect(() => {
  //   // useEffect 로직을 작성하세요.
  // }, [])


  return (
    <div>
      <AppBar />
      <div className={styles.quizContainer}>
        <div className={styles.textArea}>
          <p className={styles.titleFont}>일상 한국어 배우기</p>
          <p>일상 한국어 단어와 문장 퀴즈를 풀어보세요!</p>
        </div>
        <div>
          <Link to="/quiz/question-page">
            <div className={styles.quizCardContainer}>
              <img src={process.env.PUBLIC_URL + '/assets/Quiz/wordCard.png'} alt="단어퀴즈" /> 
              <div className={styles.quizCardText}>
                <p className={styles.cardMainFont}>단어퀴즈</p>
                <p>뜻 해석하기, 듣고 맞추기</p>
              </div>
            </div>
          </Link>

          <Link to="/quiz/incorrect-note">
            <div className={styles.quizCardContainer}>
              <img src={process.env.PUBLIC_URL + '/assets/Quiz/sentenceCard.png'} alt="문장퀴즈" /> 
              <div className={styles.quizCardText}>
                <p className={styles.cardMainFont}>문장퀴즈</p>
                <p>문장 완성하기, 듣고 맞추기</p>
              </div>
            </div>
          </Link>
        </div>

        <div className={styles.textArea}>
          <p className={styles.titleFont}>다시 풀어보기</p>
          <p>틀린 문제를 다시 풀고 실력을 높여 보세요!</p>
        </div>
        <div>
          <Link to="/quiz/incorrect-note">
            <div className={styles.quizThird}>
              <p className={styles.cardMainFont}>다시풀기</p>
              <p>원하는 만큼만 풀어보세요</p>
            </div>
          </Link>
        </div>
      </div>
    
    </div>
  );
}

export default Quiz;
