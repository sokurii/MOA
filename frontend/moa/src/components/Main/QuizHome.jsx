import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/Main/Main.module.css';

function QuizHome(props) {

  const navigate = useNavigate()
  const handleQuizClick = () => {
    navigate('/quiz')
  }
  const navigateTo = (path) => {
    navigate(path); // 3초 후에 페이지 이동
  };

  return (
    <div>
      <div onClick={handleQuizClick}  className={styles.cardContainer}>
        <img
          src={process.env.PUBLIC_URL + '/assets/Background/card2.png'}
          alt="퀴즈보기"
        />
        <div className={styles.textContainer}>
          <p className={styles.homeTitleFont}>퀴즈풀기</p>
          <p className={styles.homeSubFont}>
            일상 한국어를 공부해요
            <br />
            모아가 다양한 퀴즈를 제공합니다
          </p>
        </div>
      </div>


      <div className={styles.subCardContainer} onClick={() => navigateTo('/quiz/incorrect-note')}>
        <img
          src={process.env.PUBLIC_URL + '/assets/Background/card2-1.png'}
          alt="오답노트"
        />
        <div className={styles.subTextContainer}>
          <p className={styles.homeTitleFont}>오답노트</p>
          <p className={styles.homeSubFont}>
            틀린 문제들을
            <br />
            다시 풀어보며 공부
          </p>
        </div>
      </div>

    </div>

  );
}

export default QuizHome;
