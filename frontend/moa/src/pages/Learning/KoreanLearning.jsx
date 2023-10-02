import React, { useState, useEffect } from 'react';
import KeywordItem from '../../components/Learning/KeywordItem';
import WordCloud from '../../components/Learning/WordCloud';
import PopularWords from '../../components/Learning/PopularWords';
import AppBar from '../../components/AppBar';
import Korean from '../../styles/Learning/KoreanLearning.module.css';
import { Link } from 'react-router-dom';
import { learningApi } from '../../api/learningApi';

function KoreanLearning(props) {
  const [words, setWords] = useState([]);
  const [popularWords, setPopularWords] = useState([]);

  useEffect(() => {
    learningApi.getPopularWord()
      .then((response) => {
        const res = response.data;
        setWords(res);
        setPopularWords(res);
      })
  }, []);

  return (
    <div >
      <AppBar />
      <div className={Korean.displayWord}>
        <div className={Korean.font}> View words about...</div>
        <Link to="/koreanlearning/keyword">
          <img src="../../../assets/news/modifyKeyword.png"  style={{ width: '20px'}}></img>
        </Link>
      </div>
      <KeywordItem />
      <div className={Korean.display}>
        <div className={Korean.font}>Trending Words Now!</div>
      </div>
      <WordCloud words={words} /> 
      <div className={Korean.display}>
        <div className={Korean.font}>Most Popular Word</div>
      </div>
      <PopularWords popularWords={popularWords}/>
    </div>
  );
}

export default KoreanLearning;