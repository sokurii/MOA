import React, {useState, useEffect} from 'react';
import News from '../../styles/Learning/WordLearning.module.css';
import WordLogo from '../../components/Learning/WordLogo';
import Word from '../../components/Learning/Word';
import Usecase from '../../components/Learning/Usecase';
import RelatedNews from '../../components/Learning/RelatedNews';
import { useLocation, useNavigate  } from 'react-router-dom';
import { learningApi } from '../../api/learningApi';

function WordLearning(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [news, setNews] = useState([]);

  const word = {...location.state};
  const handleButtonClick = ( news ) => {
    navigate('/koreanlearning/word/news', {
      state: {
        news: news,
        word: word
      }
    })
  };

  useEffect(() => {
    learningApi.getRelatedNewsByWord(word.word)
      .then((response) => {
        const res = response.data;
        console.log(res)
        setNews(res);
        console.log(news)
      })
      .catch((error) => {
            console.error("API 요청 중 오류 발생:", error);
      });
  }, []);

  return (
    <div >
        <WordLogo word={"단어"}/>
        <div className={News.display}>
          <div className={News.font}> Word </div>
        </div>
        <Word word={word} />
        <div className={News.display}>
          <div className={News.font}> Usecases </div>
        </div>
        <Usecase/>
        <div className={News.displayPlus}>
          <div className={News.font}> Related News </div>
          <div className={News.displayPlusRightFont} onClick={() => handleButtonClick(news.slice(0, 10))}>더보기</div>
        </div>
        <RelatedNews news={news.slice(0,3)} />
    </div>
  );
}

export default WordLearning;