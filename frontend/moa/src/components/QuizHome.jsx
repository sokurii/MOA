import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import BackButton from './BackButton';
// import QuestionModal from './Quiz/QuestionModal';

const linkStyle = {
  textDecoration: 'none', // 밑줄 제거
  color: 'inherit', // 링크 색상을 상위 요소에서 상속
};

const quizHomeStyle = {
  padding: '30px',
  backgroundImage: `
    url(${process.env.PUBLIC_URL}/assets/Background/quiz_background.png)
  `,
  backgroundSize: 'cover', // 배경 이미지 크기 조절
  backgroundRepeat: 'no-repeat', // 배경 이미지 반복 없음
  backgroundPosition: 'center', // 배경 이미지 중앙 정렬
};

const quizButtonStyle = {
  background: 'linear-gradient(180deg, #E9FFB9 0%, #C9F1D7 100%)',
  borderRadius: '18px',
  margin: '40px auto',
  padding: '40px',
  boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
};

const buttonTitleStyle = {
  display: 'flex',
  color: '#284657',
  fontSize: '24px',
  fontWeight: '700',
};

const buttonContentStyle = {
  display: 'flex',
  textAlign: 'left',
  color: '#284657',
  fontSize: '18px',
  fontWeight: '700',
};

const incorrectNoteButtonStyle = {
  padding: '40px',
  background: 'linear-gradient(180deg, #E9FFB9 0%, #C9F1D7 100%)',
  borderRadius: '18px',
  margin: '40px auto',
  padding: '40px',
  boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
};

function QuizHome(props) {
  const [questions, setQuestions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 가시성을 관리할 상태 추가

  const makeWordQuiz = (() => {
    // 단어 퀴즈 질문을 생성하는 논리를 작성하세요.
  });

  useEffect(() => {
    // useEffect 로직을 작성하세요.
  }, [])

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={quizHomeStyle}>
      <Link to="/quiz" style={linkStyle}>
        <div className="quiz-button" style={quizButtonStyle}>
          <p style={buttonTitleStyle}>퀴즈풀기</p>
          <p style={buttonContentStyle}>
            일상 한국어를 공부해봐요!
            <br />
            모아로 단어 퀴즈를 풀어보세요
          </p>
        </div>
      </Link>
      <div className="collection-button" style={incorrectNoteButtonStyle}>
        <p style={buttonTitleStyle}>오답노트</p>
        <p style={buttonContentStyle}>설명</p>
      </div>
    </div>
  );
}

export default QuizHome;
