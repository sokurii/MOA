import React, { useState, useEffect } from 'react';
import News from '../../styles/Learning/RelatedNews.module.css';

function RelatedNews(props) {
  const { news } = props;

  return (
    <div>
      {news.map((news, index) => {
        return(
          <div className={News.newsContainer} key={index}>
            <div className={News.contentContainer}>
              <div className={News.NumberBox}>
                <div className={News.newsNumber}> {index+1}</div>
              </div>
              <div className={News.textContainer}>
                <div className={News.title}> {news.title} </div>
                <div className={News.content}> 번역 문장 자리</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RelatedNews;