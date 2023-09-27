import React from 'react';
import styles from './Logo.module.css'

const logoStyle = {
  width: '50%',
};

function Logo(props) {
  return (
    <div className={styles.logoDiv}>
      <img src="../../../assets/Logo/MoaLogo.png"
        className={styles.logoImg}></img>
    </div>
  );
}



export default Logo;