import React from 'react';
import News from '../../styles/Learning/KeywordItem.module.css';

function KeywordItem(props) {
  return (
    <div className={News.display}>
      <button className={News.blueBtn}>해양</button>
      <button className={News.whiteBtn}>수산</button>
      <button className={News.whiteBtn}>건강</button>
    </div>
  );
}

export default KeywordItem;