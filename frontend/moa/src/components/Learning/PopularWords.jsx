import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import Word from '../../styles/Learning/PopularWords.module.css';

function PopularWords(props) {
  const { popularWords } = props;
  const navigate = useNavigate();
  const handleButtonClick = ({ text }) => {
    navigate('/koreanlearning/word', {
      state: {
        word: text
      }
    })
  };

  return (
    <div>
        {popularWords.map((word, index) => {
              const { text, value } = word;
              return (
                <div key={index}>
                  <button className={Word.wordBtn} onClick={() => handleButtonClick({text})}>
                    <div className={Word.wordWrap}>
                      <div className={Word.wordBold}> {text} </div> 
                      <div className={Word.wordRight}> {value}회 </div>
                    </div>
                  </button>
                </div>
              );
            })} 
    </div>
  );
}

export default PopularWords;