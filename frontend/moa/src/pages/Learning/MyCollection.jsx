import React, { useState, useEffect } from 'react';
import Style from '../../styles/Learning/MyCollection.module.css';
import MenuHeader from '../../components/ETC/MenuHeader'
import { WordLearning, NewsLearning } from '../../components/Learning/ScrapMore';
import { useLocation, useNavigate  } from 'react-router-dom';
import { learningApi } from '../../api/learningApi';

function MyCollection(props) {
    const navigate = useNavigate();
    
    const [word, setWord] = useState([]);
    const [twoword, setTwoWord] = useState([]);
    
    const [news, setNews] = useState([]);
    const [twoNews, setTwoNews] = useState([]);
    
    useEffect(() => {
      learningApi.getWordScrap()
        .then((response) => {
            const res = response.data.response;
            if(res.length > 2) {
                setTwoWord(res.slice(0, 2));
            }
            else setTwoWord(res.slice(0, res.length));
            setWord(res);
        })
    }, []);

    useEffect(() => {
        learningApi.getNewsScrap()
          .then((response) => {
            const res = response.data.response;
            if(res.length > 2) {
                setTwoNews(res.slice(0, 2));
            }
            else setTwoNews(res.slice(0, res.length));

            setNews(res);
            console.log("response: " +JSON.stringify(twoNews))
            console.log("res: " + res)
          })
    }, []);

    const handleWord = () => {
        navigate('/koreanlearning/myWord', {
            state: {
              word: word
            }
        })
    }

    const handleArticles = () => {
        navigate('/koreanlearning/myArticles', {
            state: {
                news: news
            }
        })
    }

    return (
        <div className={Style.background}>
            <MenuHeader title="스크랩북" />
            <div >
                <div className={Style.scrapBoxContainer}>
                    <div className={Style.fontContainer}>
                        <div className={Style.wordFont}>단어장</div>
                        { word.length > 2 && (
                            <div className={Style.plusFont} onClick={handleWord}>more</div>
                        )}
                    </div>
                    <WordLearning word={twoword}/>
                </div>
                <div className={Style.scrapBoxContainer}>
                    <div className={Style.fontContainer}>
                        <div className={Style.wordFont}>나의 뉴스</div>
                        { news.length > 2 && (
                            <div className={Style.plusFont} onClick={handleArticles}>more</div>
                        )}
                    </div>
                    <NewsLearning news={twoNews}/>
                </div>
            </div>
        </div>
    );
}

export default MyCollection;