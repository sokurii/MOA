import React from 'react';
import { useLocation  } from 'react-router-dom';
import Style from '../../styles/Learning/MyCollection.module.css';
import MenuHeader from '../../components/ETC/MenuHeader'
import {NewsLearning} from '../../components/Learning/ScrapMore';

function MyArticles(props) {
    const location = useLocation();
    const news = {...location.state};
    return (
        <div className={Style.background}>
            <MenuHeader title="저장한 기사" />
            <div className={Style.scrapContainer}>
                <NewsLearning news={news.news}/>
            </div>
        </div>
    );
}

export default MyArticles;