import React, { useState } from 'react';
import KeywordModal from './KeywordModal';

function Keyword(props) {
  const [isModalOpen, setModalOpen] = useState(false);

  // 모달 열기 함수
  const openModal = () => {
    setModalOpen(true);
  };

  // 모달 닫기 함수
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <p>키워드 설정 Component</p>
      <button onClick={openModal}>키워드 설정</button>

      {isModalOpen && <KeywordModal closeModal={closeModal} />}
    </div>
  );
}

export default Keyword;
