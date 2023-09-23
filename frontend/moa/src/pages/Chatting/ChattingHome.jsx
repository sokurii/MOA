import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import BuddyChattingModal from './BuddyChattingModal';
import OpenChattingModal from './OpenChattingModal';

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
        <Link to="/chatting/buddy">
          <button>버디 1:1 채팅</button>
        </Link>
        <Link to="/chatting/openchat">
          <button>오픈 채팅</button>
        </Link>
      </div>
    </div>
  );
}

export default ChattingHome;