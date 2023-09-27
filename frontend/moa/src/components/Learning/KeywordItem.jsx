import React, { useState } from 'react';
import News from '../../styles/Learning/KeywordItem.module.css';

function KeywordItem(props) {
  const [selectedButton, setSelectedButton] = useState(null);
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  return (
    <div className={News.display}>
      <button className={`btn ${selectedButton === '해양' ? News.blueBtn : News.whiteBtn}`}
          onClick={() => handleButtonClick('해양')}
        >해양</button>
      <button className={`btn ${selectedButton === '수산' ? News.blueBtn : News.whiteBtn}`}
          onClick={() => handleButtonClick('수산')}
        >수산</button>
      <button className={`btn ${selectedButton === '건강' ? News.blueBtn : News.whiteBtn}`}
          onClick={() => handleButtonClick('건강')}
        >건강</button>
    </div>
  );
}

export default KeywordItem;