import React from 'react';
import Logo2 from '../assets/Logo/MoaLogo.png';
import News from '../styles/Learning/news.css';

const logoStyle = {
    width: '50%',
};

function Logo(props) {
  return (
    <div className='top-container'>
        <img src={Logo2} alt="main logo" style={{ width: '20%', marginTop: '10%' }}/>
    </div>
  );
}



export default Logo;