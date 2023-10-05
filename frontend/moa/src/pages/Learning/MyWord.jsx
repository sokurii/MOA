import React from 'react';
import { useLocation  } from 'react-router-dom';
import Style from '../../styles/Learning/MyCollection.module.css';
import MenuHeader from '../../components/ETC/MenuHeader'
import { WordLearning } from '../../components/Learning/ScrapMore';

function MyWord(props) {
    const location = useLocation();

    const word = {...location.state};
    console.log(word)
    return (
        <div className={Style.background}>
            <MenuHeader title="저장한 단어" />
            <div className={Style.scrapContainer}>
                <WordLearning word={word.word}/>
            </div>
        </div>
    );
}

export default MyWord;