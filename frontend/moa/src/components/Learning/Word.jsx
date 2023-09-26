import React from 'react';
import News from '../../styles/Learning/word.css';

const logoStyle = {
    width: '50%',
};

function WordLogo(props) {
  return (
    <div className='middle-container'>
        <div className='middle-top'>
            <div>
                <div className='font-container'>
                    <div className='top-left-font'> 해양치유</div>
                    <div className='top-right-font'>  &nbsp; marine therapy</div> <br />
                </div>
                <div className='font-br-container top-left-font'>[Yeshi dan-eo]</div>
            </div>
            <button className='sound-container'>
                <img className='sound-img' src="../../../assets/news/volumeHigh.png" alt=""></img>
            </button>
        </div>
        <button className='ask-button'>
            <div className='ask-font'>Ask to AI</div>
        </button>
    </div>
  );
}


export default WordLogo;