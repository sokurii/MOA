import React, { useState, useEffect } from 'react';

import WordModal from './WordModal';

function PopularWordsItem(props) {
  const { word, percentage } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <div>
        <button onClick={openModal}>
          { word }
        </button>
        { percentage }%
      </div>

      {isModalVisible &&
        <WordModal
          closeModal={closeModal}
          word={word}
        />}
    </div>
  );
}

export default PopularWordsItem;