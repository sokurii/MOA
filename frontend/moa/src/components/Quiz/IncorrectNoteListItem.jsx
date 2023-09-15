import React, { useState, useEffect } from 'react';

function IncorrectNoteListItem(props) {
  const [selections, setSelections] = useState([]);
  const { id, type, question, answer, incorrectSelections } = props;

  // 보기 순서 섞기 (Fisher-Yates Shuffle)
  useEffect(() => {
    const allSelections = [answer, ...incorrectSelections];
    const shuffledSelections = shuffleArray(allSelections);

    setSelections(shuffledSelections);
  }, [answer, incorrectSelections]);


  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  return (
    <div>
      <p>오답 문제</p>
      <ul>
        {selections.map((selection, index) => (
          <li key={index}>{selection}</li>
        ))}
      </ul>
    </div>
  );
}

export default IncorrectNoteListItem;
