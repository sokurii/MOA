import React, { useState, useEffect } from 'react';
import KeywordItem from '../../components/Learning/KeywordItem';
import WordCloud from '../../components/Learning/WordCloud';
import PopularWords from '../../components/Learning/PopularWords';
import AppBar from '../../components/ETC/AppBar';
import Korean from '../../styles/Learning/KoreanLearning.module.css';
import Loading from '../../components/Loading'
import { Link } from 'react-router-dom';
import { learningApi } from '../../api/learningApi';

function KoreanLearning(props) {
  const [words, setWords] = useState([]);
  const [popularWords, setPopularWords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    learningApi.getPopularWord()
      .then((response) => {
        const res = response.data;
        setWords(res);
        setPopularWords(res);
        setIsLoading(false);
      })
  }, []);

  return (
    <div >
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          <AppBar />
          <div className={Korean.displayWord}>
            <div className={Korean.font}> View words about...</div>
            <Link to="/koreanlearning/keyword">
              <img src="../../../assets/news/modifyKeyword.png" className={Korean.modify}></img>
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
          <PopularWords popularWords={popularWords} />
        </>
      )}

    </div>
  );
}

export default KoreanLearning;