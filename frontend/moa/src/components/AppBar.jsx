import React from 'react';
import { Link } from 'react-router-dom';

const appBarStyle = {
  padding: '0 10px',
  marginBottom: '10px',
  display: 'flex',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
};

const imgContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto',
};

const imgStyle = {
  width: '50%',
  margin: '10px auto',
};

function AppBar(props) {
  return (
    <div style={appBarStyle}>
      <Link style={imgContainerStyle} to="/">
        <img style={imgStyle} src={process.env.PUBLIC_URL + '/assets/Logo/MoaLogo.png'} alt="로고" />
      </Link>
    </div>
  );
}

export default AppBar;