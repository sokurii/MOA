import React from 'react';
import News from '../styles/Learning/news.css';

const logoStyle = {
    width: '50%',
};

function Logo(props) {
  return (
    <div className='top-container'>
      <img src="../../../assets/Logo/MoaLogo.png"  style={{ width: '20%', marginTop: '10%' }}></img>
    </div>
  );
}



export default Logo;