import React, { useState, useEffect } from 'react';
import Style from '../../styles/Learning/MyCollection.module.css';
import { learningApi } from '../../api/learningApi';

function WordLearning(props) {
    const { word } = props;

    return (
        <div className={Style.middleTopContainer}>
            {
                word.map((list, index) => {
                    return (
                        <div className={Style.middleContainer} key={index}>
                            <div className={Style.wordFont}>{list.wordName}</div>
                            <div className={Style.myWordFont}>{list.wordMean}</div>
                        </div>
                    )
                })
            }
        </div>
    );
}

function NewsLearning(props) {
    const { news } = props;
    const [translatedSentence, setTranslatedSentence] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const translatedSentences = await Promise.all(news.map(item => learningApi.translateText(item.articleTitle)));
            setTranslatedSentence(translatedSentences.map(response => response.data.response));
          } catch (error) {
            console.error("API 요청 중 오류 발생:", error);
          }
        };
    
        fetchData();
      }, [news]);
    
    return (
        <div className={Style.middleTopContainer}>
            {
                news.map((list, index) => {
                    const translatedItem = translatedSentence[index];
                    return (
                        <div className={Style.middleContainer} key={index}>
                            <div className={Style.wordFont}>{list.articleTitle}</div>
                            <div className={Style.myWordFont}>{translatedItem}</div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export { WordLearning, NewsLearning };