import React, {useState,useEffect} from 'react';
import { quizApi } from '../../api/quizApi';
import { Link } from 'react-router-dom';
import styles from '../../styles/Quiz/IncorrectNote.module.css';
import MenuHeader from '../../components/ETC/MenuHeader';
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
    const newQuiz = parseInt(e.target.value, 10);
    setMyQuizCnt(newQuiz);
  }
  
  // const updateMyQuiz = async () => {
  //   try{
  //     const response = await quizApi.getRandomWrongAnswer({quizWrongCount: myQuizCnt});
  //     // console.log('풀 문제 수', myQuizCnt);
  //     console.log('다시풀기', response.data);
  //   } catch(error){
  //     console.error('풀 문제 수 업데이트 중 에러 발생', error);
  //   }
  // };

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
          <div className={styles.retryBtn}>
            <Link to="/incorrect-note-list">풀기</Link>
          </div>
          {/* <Link to={{ pathname:"/incorrect-note-list", state:{myQuizCnt}}}>풀기</Link> 이걸로 해야함 */}

          {/* <IncorrectNoteList /> */}
        </div>
      </div>
    </div>
  );
}

export default IncorrectNote;