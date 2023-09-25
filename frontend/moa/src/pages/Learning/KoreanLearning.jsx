import React from 'react';
import BackButton from '../../components/BackButton';

import Keyword from '../../components/Learning/Keyword';
import WordCloud from '../../components/Learning/WordCloud';
import PopularWords from '../../components/Learning/PopularWords';
import RelatedNews from '../../components/Learning/RelatedNews';
import { Link } from 'react-router-dom';

function KoreanLearning(props) {
  return (
    <div>
      <BackButton />
      <h1>학습 페이지</h1>
      <Keyword />
      <hr />
      <WordCloud />
      <hr />
      <PopularWords />
      
      <Link to="/koreanlearning/article"> 뉴스보기 </Link>
    </div>
  );
}

export default KoreanLearning;