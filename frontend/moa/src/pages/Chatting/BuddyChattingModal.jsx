import React,{useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuHeader from '../../components/ETC/MenuHeader';
import BuddyChatArea from '../../components/Chatting/BuddyChatArea';
import styles from "../../styles/EtcComponent/MenuHeader.module.css"

const buddyChatStyle = {
  height: '100vh',
};

function BuddyChattingModal(props) {
  const location = useLocation();
  const state = location.state;
  const buddyId = state.buddyId;


  const navigate = useNavigate();
  const handleBackClick = (e) => {
    navigate('/chatting');
}
  
  return (
    <div style={buddyChatStyle}>
          <div className={styles.header}>
      <div className={styles.headerContainer}>
        <div onClick={(e) => handleBackClick(e)}>
          <img src={process.env.PUBLIC_URL + '/assets/etcComponent/backBtn.png'} alt="뒤로가기" /> 
        </div>
        <span className={styles.headerText}>버디 채팅</span>
      </div>
    </div>

      {/* <div className={styles.header}>
              <div className={styles.headerTop}>
                  <span className={styles.back} onClick={(e) => handleBackClick(e)}></span>
                  <span className={styles.title}>버디 채팅</span>
              </div>
          </div> */}
      <BuddyChatArea buddyId={buddyId}/>
    </div>
  );
}

export default BuddyChattingModal;
