import React from 'react';

import CloseButton from '../CloseButton';
import ChattingArea from './ChattingArea';

function BuddyChattingModal(props) {
  return (
    <div>
      <CloseButton onClose={props.closeModal}/>
      <p>버디 1:1 채팅</p>
      <ChattingArea />
    </div>
  );
}

export default BuddyChattingModal;