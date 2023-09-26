import React, { useState, useEffect } from 'react';

import PopularWordsItem from './PopularWordsItem';

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
            <button className='word-btn'>
              <div className='word-bold'> {word} </div> 
              <div className='word-right'> {percentage}% </div>
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PopularWords;