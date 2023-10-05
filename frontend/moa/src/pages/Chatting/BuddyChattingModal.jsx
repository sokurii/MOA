import React from 'react';
import { useLocation } from 'react-router-dom';
import MenuHeader from '../../components/ETC/MenuHeader';
import BuddyChatArea from '../../components/Chatting/BuddyChatArea';

const buddyChatStyle = {
  height: '100vh',
};

function BuddyChattingModal(props) {
  const location = useLocation();
  const state = location.state;
  const buddyId = state.buddyId;
  
  return (
    <div style={buddyChatStyle}>
      <MenuHeader title="버디 채팅"/>
      <BuddyChatArea buddyId={buddyId}/>
    </div>
  );
}

export default BuddyChattingModal;
