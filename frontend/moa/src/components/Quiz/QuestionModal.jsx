import React from 'react';
import CloseButton from '../CloseButton';

function QuestionModal(props) {
  return (
    <div>
      <CloseButton onClose={props.closeModal} />
      <p>특정 문제 컴포넌트</p>
    </div>
  );
}

export default QuestionModal;
