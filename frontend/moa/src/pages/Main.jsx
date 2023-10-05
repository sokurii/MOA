import React, { useState, useEffect } from 'react';

import store from '../store';
import { useAppDispatch } from '../store';
import AppBar from '../components/ETC/AppBar';
import MainArea from '../components/Main/MainArea';
import BottomBar from '../components/ETC/BottomBar';

import Loading from '../components/Loading';
import styles from '../styles/Main/Main.module.css';


// const mainAreaContainerStyle = {
//   flex: '1',
// };

// const bottomBarContainerStyle = {
//   position: 'fixed',
//   bottom: '0',
//   left: '0',
//   right: '0',
//   width: '100%',
//   boxSizing: 'border-box',
//   transition: 'bottom 0.3s ease', // 트랜지션 효과 추가
// };

function Main(props) {
  const [isBottomBarVisible, setBottomBarVisible] = useState(false);
  const dispatch = useAppDispatch();

  const state = store.getState();
  const userInfo = state.userInfo;
  const memberName = JSON.parse(userInfo).memberName;

  const isLoading = state.isLoading;

  console.log(isLoading);

  useEffect(() => {
    
  }, []);


  const toggleBottomBar = () => {
    setBottomBarVisible(!isBottomBarVisible);
  };

  const bottomBarContainerStyle = {
    position: 'fixed',
    bottom: '0',
    left: '0',
    right: '0',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'bottom 0.3s ease', // 트랜지션 효과 추가
  };
  

  return (
    <div className={styles.mainPageStyle}>
      {isLoading ? <Loading /> : (
        <>
          <AppBar />
          
          <div className={styles.mainContainer}>
            <p className={styles.userNameStyle}>안녕, { memberName }!</p>
            <MainArea />
          </div>

          <div
            style={{
              ...bottomBarContainerStyle,
              bottom: isBottomBarVisible ? '0' : '-56px', // 나타날 때와 숨길 때의 위치 조절
            }}
            onClick={toggleBottomBar}
          >
            <BottomBar />
          </div>
        </>
      )}
    </div>
  );
}

export default Main;
