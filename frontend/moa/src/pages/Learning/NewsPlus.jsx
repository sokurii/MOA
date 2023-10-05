import React from 'react';
import News from '../../styles/Learning/WordLearning.module.css';
import MenuHeader from '../../components/ETC/MenuHeader'
import RelatedNews from '../../components/Learning/RelatedNews';
import { useLocation  } from 'react-router-dom';


function WordLearning(props) {
    const location = useLocation();
    const news = location.state.news;
    const word = location.state.word;
    return (
        <div >
            <MenuHeader title="뉴스보기" />
            <div className={News.textContainer}>
                <div className={News.newsAbout}>News About</div>
                <div className={News.word}>{word.word}</div>
            </div>

            <div className={News.line}></div>
            <RelatedNews news={news}/>
        </div>
    );
}

export default WordLearning;