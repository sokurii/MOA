import React, { useState, useEffect } from 'react';
import News from '../../styles/Learning/RelatedNews.module.css';
import { learningApi } from '../../api/learningApi';

function RelatedNews(props) {
  const { news } = props;
  const [translatedSentence, setTranslatedSentence] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const translatedSentences = await Promise.all(news.map(item => learningApi.translateText(item.title)));
        setTranslatedSentence(translatedSentences.map(response => response.data.response));
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    };

    fetchData();
  }, [news]);

  return (
    <div>
      {news.map((news, index) => {
        const translatedItem = translatedSentence[index];
        return(
          <div className={News.newsContainer} key={index}>
            <div className={News.contentContainer}>
              <div className={News.NumberBox}>
                <div className={News.newsNumber}> {index+1}</div>
              </div>
              <div className={News.textContainer}>
                <div className={News.title}> {news.title} </div>
                <div className={News.content}> {translatedItem} </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RelatedNews;