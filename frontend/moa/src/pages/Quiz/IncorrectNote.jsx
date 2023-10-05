import React, {useState,useEffect} from 'react';
import { quizApi } from '../../api/quizApi';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../styles/Quiz/IncorrectNote.module.css';
import MenuHeader from '../../components/ETC/MenuHeader';
import BottomBar from '../../components/ETC/BottomBar';
// import IncorrectNoteList from '../../components/Quiz/IncorrectNoteList';


function IncorrectNote(props) {
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);
  const [myQuizCnt, setMyQuizCnt] = useState(1);

  useEffect(() => {
    const fetchWrongAnswerCount = async () => {
      try {
        const response = await quizApi.getWrongAnswerCount();
        const count = response.data.response.quizWrongCount;
        setWrongAnswerCount(count);
      } catch (error) {
        console.error('틀린 문제 수 가져오는 중 에러 발생:', error);
      }
    };

    fetchWrongAnswerCount();
  }, []);

  const handleMyQuiz = (e) => {
    const inputValue = e.target.value;
    const newQuiz = inputValue ? parseInt(inputValue, 10) : '';
    setMyQuizCnt(newQuiz);
    console.log(newQuiz)
  }
  const navigate = useNavigate();
  const handleRetryQuiz = () => {
    navigate('/quiz/incorrect-note-list',{ state : {myQuizCnt} });
  }
  return (
    <div>
      <MenuHeader title="다시풀기"/>
      <img src={process.env.PUBLIC_URL + '/assets/Quiz/resultBg.png'} 
        alt="다시풀기배경" className={styles.retryBg}/> 
      <div className={styles.retryContainer}>
        <div>
          <div className={styles.wrongCnt}>
            <p>내가 틀린 문제는</p>
            <span  style={{ color: '#BF1F1F'}}>{wrongAnswerCount}</span><span> 문제</span>
          </div>
          <div className={styles.wrongCnt}>
            <p>오늘 풀 문제는</p>
            <input
              type="number"
              value={myQuizCnt}
              onChange={handleMyQuiz} 
              style={{ color: '#0980D0'}}
            /><span> 문제</span>
          </div>
          <div className={styles.retryBtn} onClick={handleRetryQuiz}>
            풀기
            {/* <Link to={{ pathname:"/quiz/incorrect-note-list", state:{myQuizCnt}}}>풀기</Link> */}
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}

export default IncorrectNote;