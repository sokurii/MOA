import React from 'react';

import CloseButton from '../CloseButton';
import Usecase from './Usecase';
import RelatedNews from './RelatedNews';


function WordModal(props) {
  return (
    <div>
      <CloseButton onClose={props.closeModal}/>

      <div>
        <p>{ props.word }</p>
      </div>
      <hr />
      <Usecase />
      <hr />
      <RelatedNews />
    </div>
  );
}

export default WordModal;