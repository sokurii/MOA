import React, { useState, useEffect } from 'react';
import Word from '../../styles/Learning/PopularWords.module.css';

function PopularWords(props) {
  const [ popularWords, setPopularWords ] = useState([
    { word: '해양치유', percentage: 22.2 },
    { word: '노르딕 워킹', percentage: 11.1 },
    { word: '웰니스', percentage: 5.5 },
  ]);

  return (
    <div>
      {popularWords.map((popularWord, index) => {
        const { word, percentage } = popularWord;

        return (
          <div key={index}>
            <button className={Word.wordBtn}>
              <div className={Word.wordBold}> {word} </div> 
              <div className={Word.wordRight}> {percentage}% </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PopularWords;