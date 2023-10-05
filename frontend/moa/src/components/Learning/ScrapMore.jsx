import React, { useState, useEffect } from 'react';
import Style from '../../styles/Learning/MyCollection.module.css';
import { learningApi } from '../../api/learningApi';

function WordLearning(props) {
    const { word } = props;
    const [wordList, setWordList] = useState(word);

    useEffect(() => {
        setWordList(word);
    }, [word]);

    const removeData = async (index) => {
      try {
        console.log(index);
        console.log(word[index]);
        await learningApi.deleteWordScrapBook(word[index].wordId);
        
        const updatedWordList = [...wordList];
        updatedWordList.splice(index, 1);
        setWordList(updatedWordList);
      } catch (error) {
        console.error('단어 스크랩 삭제 중 에러 발생:', error);
      }
    };

    return (
        <div className={Style.middleTopContainer}>
            {
                wordList.map((list, index) => {
                    return (
                        <div className={Style.middleContainer} key={index}>
                            <div className={Style.leftTextContainer}>
                                <div className={Style.myWordKoreanFont}>{list.wordName}</div>
                                <div className={Style.myWordFont}>{list.wordMean}</div>
                            </div>
                            <div className={Style.rightIconContainer}>
                                <img className={Style.imgBox} 
                                    onClick={() => removeData(index)}
                                    src="../../../assets/Icons/removeCollection.png">
                                </img>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

function NewsLearning(props) {
    const { news } = props;
    const [newsList, setNewsList] = useState(news); 
    const [translatedSentence, setTranslatedSentence] = useState([]);

    useEffect(() => {
        setNewsList(news);
    }, [news]);

    const removeData = (index) => {
        try {
          learningApi.deleteNewsScrapBook(news[index].articleId);

          const updatedNewsList = [...newsList];
          updatedNewsList.splice(index, 1);
          setNewsList(updatedNewsList);
        } catch (error) {
          console.error('뉴스 스크랩 삭제 중 에러 발생:', error);
        }
    };

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
                newsList.map((list, index) => {
                    const translatedItem = translatedSentence[index];
                    return (
                        <div className={Style.middleContainer} key={index}>
                            <div className={Style.leftTextContainer}>
                                <div className={Style.myWordKoreanFont}>{list.articleTitle}</div>
                                <div className={Style.myWordFont}>{translatedItem}</div>
                            </div>
                            <div className={Style.rightIconContainer}>
                                <img className={Style.imgBox} 
                                    onClick={() => removeData(index)}
                                    src="../../../assets/Icons/removeCollection.png">
                                </img>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export { WordLearning, NewsLearning };