import React, { useEffect, useRef, useState } from 'react';
import { diaryApi } from '../../../api/diaryApi';
import { useNavigate } from 'react-router-dom';
import MenuHeader from '../../../components/MenuHeader';
import styles from '../Diary/ExchangeDiaryContent.module.css'
import Calendar from 'react-calendar';
import '../Diary/DiaryCalender.css';
// import 'react-calendar/dist/Calendar.css'; // css import
import moment from 'moment/moment';

import { WOW } from 'wowjs';


function ExchangeDiaryContent() {
    const [value, onChange] = useState(new Date());
    const [exchangeDiaryContent, setExchangeDiaryContent] = useState('');
    const [diaries, setDiaries] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

    const mark = ["2023-09-02", "2023-09-14", "2023-09-27"];
    const foreignerMark = ["2023-09-14", "2023-09-26"];

    const navigate = useNavigate();

    const dateToExchangeDiaryIdMap = {};

    useEffect(() => {
        diaryApi.getDiaryList(selectedMonth)
            .then((response) => {
                response.data.response.forEach((item) => {
                    const exchangeDiaryDate = item.exchangeDiaryDate.split('T')[0];
                    const exchangeDiaryId = item.exchangeDiaryId;
                    const exchangeDiaryKorean = item.member.memberName;
                    console.log(exchangeDiaryKorean);
                    dateToExchangeDiaryIdMap[exchangeDiaryDate] = exchangeDiaryId;
                    console.log(exchangeDiaryDate, exchangeDiaryId);
                })
                setDiaries(response.data.response);
            })
            .catch((e) => {
                const error = e.error;
                console.log('교환일기 전체 조회 에러 발생');
                console.log(e);
            })
    }, [selectedMonth]);

    useEffect(() => {
        // wowjs 초기화
        const wow = new WOW();
        wow.init();
        wow.sync();
    }, []);

    // 달을 변경할 때 호출되는 콜백
    const handleActiveStartDateChange = ({ activeStartDate }) => {
        setSelectedMonth(activeStartDate.getMonth() + 1);
    }

    return (
        <div>
            <div className={styles.container}>
                <MenuHeader title="나의 일기"></MenuHeader>
                <div className={styles.diaryInside + ' wow fadeInLeft'} >
                    <img
                        className={styles.diaryInsideImg}
                        src={process.env.PUBLIC_URL + '/assets/ExchangeDiary/diary_inside.png'}></img>
                    <div className={styles.diaryCalender}>
                        <Calendar onChange={onChange}
                            onActiveStartDateChange={handleActiveStartDateChange}
                            value={value}
                            formatDay={(locale, date) => moment(date).format("DD")}
                            showNeighboringMonth={false}
                            navigationLabel={null}
                            next2Label={null}
                            prev2Label={null}
                            tileContent={({ date, view }) => {
                                // 추가할 html 태그를 변수 초기화
                                let html = [];
                                // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
                                if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                                    html.push(<div className="dot"></div>);
                                }
                                if (foreignerMark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                                    html.push(<div className='foreignerDot'></div>)
                                }
                                // 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
                                return (
                                    <>
                                        <div className="dotDiv">
                                            {html}
                                        </div>
                                    </>
                                );
                            }}
                        ></Calendar>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExchangeDiaryContent;