import React, { useState, useEffect } from 'react';
import News from '../../styles/Learning/KeywordItem.module.css';
import { keywordApi } from '../../api/keywordApi';

function KeywordItem(props) {
  const [selectedButton, setSelectedButton] = useState(null);
  const [keyword, setKeyword] = useState([]);
  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  useEffect(() => {
    keywordApi.getKeywords()
      .then((response) => {
        console.log(response)
        const res = response.data.response;
        setKeyword(res);
        console.log(res)
      })
  }, []);

  return (
    <div className={News.display}>
        {/* {keyword.map((step, index) => {
          return (
            <button key={index} style={News.blueBtn}>
              {step}
            </button>
          );
        })} */}
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