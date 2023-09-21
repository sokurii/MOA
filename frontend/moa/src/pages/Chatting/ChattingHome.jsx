import React, { useState, useEffect } from 'react';

import BackButton from '../../components/BackButton';
import BuddyChattingModal from '../../components/Chatting/BuddyChattingModal';
import OpenChattingModal from '../../components/Chatting/OpenChattingModal';

function ChattingHome(props) {
  const [isBuddyChattingModalOpen, setIsBuddyChattingModalOpen] = useState(false);
  const [isOpenChattingModalOpen, setIsOpenChattingModalOpen] = useState(false);

  const openBuddyChattingModal = () => {
    setIsBuddyChattingModalOpen(true);
  };

  const openOpenChattingModal = () => {
    setIsOpenChattingModalOpen(true);
  };


  const closeBuddyChattingModal = () => {
    setIsBuddyChattingModalOpen(false);
  };
  const closeOpenChattingModal = () => {
    setIsOpenChattingModalOpen(false);
  };


  return (
    <div>
      <BackButton />
      <p>채팅 페이지</p>
      <div>
        <button onClick={openBuddyChattingModal}>버디 1:1 채팅</button>
        <button onClick={openOpenChattingModal}>오픈 채팅</button>
      </div>

      <BuddyChattingModal isOpen={isBuddyChattingModalOpen} closeModal={closeBuddyChattingModal}/>
      <OpenChattingModal isOpen={isOpenChattingModalOpen} closeModal={closeOpenChattingModal}/>
    </div>
  );
}

export default ChattingHome;