import React, { useState, useEffect } from 'react';

import IncorrectNoteListItem from './IncorrectNoteListItem';

function IncorrectNoteList(props) {
  const [incorrectQuestions, setIncorrectQuestions] = useState([
    { id: 1, type: '단어맞추기', question: '질문1', answer: '가나다라', 
      incorrectSelections: [
        '갸냐댜랴',
        '고노도로',
        '구누두루',
      ],
    },
    { id: 2, type: '듣고맞추기', question: '질문2', answer: '가나다라', 
      incorrectSelections: [
        '갸냐댜랴',
        '고노도로',
        '구누두루',
      ],
    },
  ]);

  return (
    <div>
      {incorrectQuestions.map((incorrectQuestion, index) => {
        const { id, type, question, answer, incorrectSelections } = incorrectQuestion;

        return (
          <div key={index}>
            <IncorrectNoteListItem
              type={type}
              question={question}
              answer={answer}
              incorrectSelections={incorrectSelections}
            />
          </div>
        );
      })}
    </div>
  );
}

export default IncorrectNoteList;