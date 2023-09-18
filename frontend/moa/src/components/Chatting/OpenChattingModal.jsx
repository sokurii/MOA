import React from 'react';

import CloseButton from '../CloseButton';
import OpenChattingList from './OpenChattingList';

function OpenChattingModal(props) {
  return (
    <div>
      <CloseButton onClose={props.closeModal}/>
      <p>오픈 채팅</p>
      <OpenChattingList />
    </div>
  );
}

export default OpenChattingModal;