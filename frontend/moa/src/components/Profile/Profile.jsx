import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import store from '../../store';
import { matchingApi } from '../../api/matchingApi';
import Cookies from 'js-cookie';

import { setIsForeigner, useAppDispatch } from '../../store';
import { setAccessToken, setIsMatching } from '../../store';
import { setUserInfo } from '../../store/userInfo';

import CloseButton from '../Buttons/CloseButton';
import LevelTable from './LevelTable';


const profileStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  // alignItems: 'center',
  background: 'white',
  zIndex: '3',
  width: '100%',
  borderBottomLeftRadius: '18px',
  borderBottomRightRadius: '18px',
  boxShadow: '0px 10px 6px rgba(0, 0, 0, 0.1)',
  fontFamily: 'Ganpan',
};

const logoutButtonStyle = {
  background: 'linear-gradient(to bottom, lightgreen, green)',
  color: 'white',
  border: 'none',
  margin: '5px',
  padding: '5px 20px',
  borderRadius: '32px',
  cursor: 'pointer',
  fontFamily: 'Ganpan',
};


const userInfoStyle = {
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  background: ' rgba(101, 208, 113, 0.25)',
  borderBottomLeftRadius: '18px',
  borderBottomRightRadius: '18px',
  boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.1)',
};

const buttonContainerStyle = {
  padding: '5px',
  display: 'flex',
  justifyContent: 'right',
  alignItems: 'center',
  background: ' rgba(101, 208, 113, 0.25)',
};

const imageContainerStyle = {
  display: 'flex',
  width: '30%',
  justifyContent: 'center',
  margin: '20px',
};

const imageStyle = {
  backgroundColor: '#C4C4C4',
  borderRadius: '9999px',
  width: '120px',
  height: '120px',
};

const userInfoRightStyle = {
  marginRight: '20px',
  display: 'flex',
  textAlign: 'left',
  flexDirection: 'column',
};

const userInfoDetailStyle = {
  margin: '10px 0',
};

const nameStyle = {
  ...userInfoDetailStyle,
  fontSize: '24px',
};

const expLevelContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  margin: '20px',
};

const labelStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

const titleStyle = {
  fontSize: '16px',
  fontWeight: '700',
};

const expLevelStyle = {
};

const expLevelTopStyle = {
  display: 'flex',
  marginTop: '10px',
  justifyContent: 'center',
  alignItems: 'center',
};

const levelTableStyle = {
  display: 'flex',
  border: '2px solid black',
  borderRadius: '18px',
  padding: '3px 5px',
  fontSize: '12px',
};

const levelStyle = {
  display: 'flex',
  justifyContent: 'center',
  width: '30%',
  alignItems: 'center',
  boxShadow: '0px 6px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '10px',
};

const levelSymbolStyle = {
  width: '20%',
  marginRight: '5px',
};

const expStyle = {
  flex: '1',
  textAlign: 'right',
};

const commentStyle = {
  display: 'flex',
  fontSize: '12px',
  margin: '10px 0',
};

function Profile({ onClose }) {
  const state = store.getState();
  const userInfo = state.userInfo;
  const isForeigner = JSON.parse(userInfo).memberIsForeigner;
  const profileImgUrl = JSON.parse(userInfo).memberImgAddress;
  const memberName = JSON.parse(userInfo).memberName;
  const nation = JSON.parse(userInfo).memberNationName;
  const exp = JSON.parse(userInfo).memberExp;
  const requiredExp = JSON.parse(userInfo).memberRequiredExp;
  const levelId = JSON.parse(userInfo).memberLevelId;
  const levelName = JSON.parse(userInfo).memberLevelName;
  const levelGrade = JSON.parse(userInfo).memberLevelGrade;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isTaekeukOpen, setIsTaekeukOpen] = useState(false);
  const [isLevelTableOpen, setIsLevelTableOpen] = useState(false);
  const [withBuddyDays, setWithBuddyDays] = useState(0);

  useEffect(() => {
    matchingApi.withBuddy()
    .then((response) => {
      const res = response.data.response;
      setWithBuddyDays(res);
    })
    .catch((error) => {
      console.log('버디와 함께 한 날짜 조회 오류');
      console.log(error);
    });
  }, []);

  // 로그아웃 핸들러 함수
  const handleLogout = () => {
    Cookies.remove('refreshToken');
    localStorage.removeItem('accessToken');
    dispatch(setAccessToken(''));
    dispatch(setIsMatching(null));
    dispatch(setIsForeigner(null));
    dispatch(setUserInfo(null));

    if (!Cookies.get('refreshToken')) {
      alert('로그아웃 되었습니다');
      window.location.reload();
      navigate('/login');
    } else {
      console.log('로그아웃 오류 발생');
    }
  };


  const toggleTaekeuk = () => {
    setIsTaekeukOpen(!isTaekeukOpen);
  };

  const openLevelTable = () => {
    setIsLevelTableOpen(true);
  };

  const closeLevelTable = () => {
    setIsLevelTableOpen(false);
  };

  const expBarStyle = {
    borderRadius: '18px',
    height: '10px',
    width: '100%', // 전체 너비를 100%로 설정
    backgroundColor: 'rgba(1, 1, 1, 0.3)', // 전체 경험치 바의 배경색을 회색으로 설정
  };
  
  const filledExpBarStyle = {
    borderRadius: '18px',
    height: '100%',
    width: `${(exp / requiredExp) * 100}%`, // 현재 경험치 비율에 따라 너비를 조정
    backgroundColor: 'green', // 현재 경험치 부분의 배경색을 설정
  };


  return (
    <div style={profileStyle}>
      <div style={buttonContainerStyle}>
        <button style={logoutButtonStyle} onClick={handleLogout}>
          로그아웃
        </button>
        <CloseButton onClose={onClose}/>
      </div>
      <div style={userInfoStyle}>
        <div style={imageContainerStyle}>
          <img style={imageStyle} src={profileImgUrl} alt="프로필 사진" />
        </div>
        <div style={userInfoRightStyle}>
          <span style={nameStyle}>{ memberName }</span>
          <span style={userInfoDetailStyle}>{ nation }</span>
          <span style={userInfoDetailStyle}>버디와 함께한 지 { withBuddyDays }일!</span>
        </div>
      </div>

      {isForeigner && (
        <div style={expLevelContainerStyle}>
          <div style={labelStyle}>
            <span style={titleStyle}>경험치 및 레벨</span>
            <div style={levelTableStyle} onClick={openLevelTable}>
              레벨 표
            </div>
          </div>
          <div style={expLevelStyle}>
            <div style={expLevelTopStyle}>
              <div style={levelStyle} onClick={toggleTaekeuk}>
                <div style={levelSymbolStyle}>
                  <img src={process.env.PUBLIC_URL + `/assets/level/Lv${levelId}.png`} alt={`레벨${levelId}`} />
                </div>
                <div>
                  <span>{ levelName } Lv. { levelGrade }</span>
                </div>
              </div>
              <div style={expStyle}>
                <span>{ exp } / { requiredExp }</span>
                <div style={expBarStyle}>
                  <div style={filledExpBarStyle}></div>
                </div>
              </div>
            </div>
            <div style={commentStyle}>
              <span>레벨 클릭 시 태극기 진척도를 확인할 수 있어요!</span>
            </div>
          </div>
          {isTaekeukOpen && <div><img src={process.env.PUBLIC_URL + `/assets/TaekeukFlag/Lv${levelId}_All.png`} alt={`레벨${levelId}`} /></div>}
          {isLevelTableOpen && 
            <div>
              <div style={{
                padding: '5px',
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
              }}>
                <CloseButton onClose={closeLevelTable}/>
              </div>
              <LevelTable />
            </div>
          }
        </div>
      )}
    </div>
  );
}

export default Profile;