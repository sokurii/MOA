import React from 'react';
import News from '../../styles/Learning/WordLearning.module.css';
import WordLogo from '../../components/Learning/WordLogo';
import RelatedNews from '../../components/Learning/RelatedNews';
import { useLocation  } from 'react-router-dom';


function WordLearning(props) {
    const location = useLocation();
    const news = location.state.news;
    const word = location.state.word;
    return (
        <div >
            <WordLogo word={"뉴스"}/>
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