import React from 'react';
import { useLocation  } from 'react-router-dom';
import Style from '../../styles/Learning/MyCollection.module.css';
import CollectionLogo from '../../components/Learning/CollectionLogo';
import { WordLearning } from '../../components/Learning/ScrapMore';

function MyWord(props) {
    const location = useLocation();

    const word = {...location.state};
    console.log(word)
    return (
        <div >
            <CollectionLogo logo="My Word"/>
            <div className={Style.scrapContainer}>
                <WordLearning word={word.word}/>
            </div>
        </div>
    );
}

export default MyWord;