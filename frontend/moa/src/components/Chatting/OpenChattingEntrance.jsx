import React from 'react';

import CloseButton from '../CloseButton';

function OpenChattingEntrance(props) {
  return (
    <div>
      <CloseButton
        closeModal={props.closeModal}
      />
      <p>오픈채팅 입장 페이지</p>
      <div>
        <p>사진 Component</p>
      </div>
      <hr />
      <div>
        <h3>{ props.title }</h3>
        <p>{ props.participate.length}</p>
      </div>
      <hr />
      <div>
        { props.description }
      </div>
    </div>
  );
}

export default OpenChattingEntrance;