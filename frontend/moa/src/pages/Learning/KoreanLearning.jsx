import React from 'react';
import BackButton from '../../components/BackButton';

import Keyword from '../../components/Learning/Keyword';
import WordCloud from '../../components/Learning/WordCloud';
import PopularWords from '../../components/Learning/PopularWords';

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
    </div>
  );
}

export default KoreanLearning;