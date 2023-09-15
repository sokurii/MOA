import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import BackButton from '../../components/BackButton';
import QuestionModal from '../../components/Quiz/QuestionModal';

function Quiz(props) {
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
    <div>
      <BackButton />
      <h1>일상 한국어 배우기</h1>
      <div>
        <button onClick={openModal}>단어 맞추기</button>
        <button onClick={openModal}>듣고 맞추기</button>
        <Link to="/quiz/incorrect-note">
          <button>오답노트</button>
        </Link>
      </div>

      {isModalVisible && (
        <QuestionModal closeModal={closeModal} />
      )}
    </div>
  );
}

export default Quiz;
