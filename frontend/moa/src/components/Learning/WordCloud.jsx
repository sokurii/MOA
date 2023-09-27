import React, { useEffect, useState } from 'react';
import ReactWordcloud from 'react-wordcloud';

import PopularWords from './PopularWords';

function WordCloud(props) {
  const { words } = props;
  
  return (
    <div>
      <ReactWordcloud words={words} options={{ maxFontSize: 40}} />
    </div>
  );
}

export default WordCloud;