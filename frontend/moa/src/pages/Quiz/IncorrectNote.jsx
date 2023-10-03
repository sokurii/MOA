import React from 'react';

import BackButton from '../../components/Buttons/BackButton';
import IncorrectNoteList from '../../components/Quiz/IncorrectNoteList';

function IncorrectNote(props) {
  return (
    <div>
      <BackButton />
      <h1>오답노트 목록</h1>
      <IncorrectNoteList />
    </div>
  );
}

export default IncorrectNote;