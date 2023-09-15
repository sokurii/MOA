import React, { useState, useEffect } from 'react';

import PopularWordsItem from './PopularWordsItem';

function PopularWords(props) {
  const [ popularWords, setPopularWords ] = useState([
    { word: '단어1', percentage: 22.2 },
    { word: '단어2', percentage: 11.1 },
    { word: '단어3', percentage: 5.5 },
  ]);

  return (
    <div>
      <h3>Most Popular Words</h3>
      {popularWords.map((popularWord, index) => {
        const { word, percentage } = popularWord;

        return (
          <div key={index}>
            <PopularWordsItem 
              word={word}
              percentage={percentage}
            />
          </div>
        );
      })}
    </div>
  );
}

export default PopularWords;