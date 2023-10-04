import React from 'react';
import { useLocation  } from 'react-router-dom';
import Style from '../../styles/Learning/MyCollection.module.css';
import CollectionLogo from '../../components/Learning/CollectionLogo';
import {NewsLearning} from '../../components/Learning/ScrapMore';

function MyArticles(props) {
    const location = useLocation();
    const news = {...location.state};
    return (
        <div >
            <CollectionLogo logo="My Word"/>
            <div className={Style.scrapContainer}>
                <NewsLearning news={news.news}/>
            </div>
        </div>
    );
}

export default MyArticles;