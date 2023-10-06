import React from 'react';
import CloseButton from '../Buttons/CloseButton';
import KeywordSearch from './KeywordSearch';

function KeywordModal(props) {
  return (
    <div>
      <CloseButton onClose={props.closeModal} />
      <p>키워드 Modal</p>
      <KeywordSearch />
      <div>
        <p>검색 결과 Component</p>
      </div>
    </div>
  );
}

export default KeywordModal;