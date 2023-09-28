import React from 'react';
import { useLocation } from 'react-router-dom';

function QuizResult(props) {
  // const location = props.location;
  const location = useLocation();
  const { state } = location;

  // const correctAnswers = props.location.state?.correctAnswers || 0;

  return (
    <div>
      <p>퀴즈 결과 {state}</p>
    </div>
  );
}

export default QuizResult;