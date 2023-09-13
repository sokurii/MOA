import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Intro from './pages/Intro';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import KoreanLearning from './pages/KoreanLearning';
import Quiz from './pages/Quiz';
import WithBuddy from './pages/WithBuddy';
import ExchangeDiary from './pages/ExchangeDiary';
import BalanceGame from './pages/BalanceGame';
import KoreaTour from './pages/KoreaTour';
import NotFound404 from './pages/NotFound404';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // 로그인 여부 확인

  return (
    
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element=
              {<Main 
                isLoggedIn={isLoggedIn}
              />}
          />
          <Route path="/intro" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="/koreanlearning" element={<KoreanLearning />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/withbuddy" element={<WithBuddy />} />
          <Route path="/withbuddy/exchangediary" element={<ExchangeDiary />} />
          <Route path="/withbuddy/balancegame" element={<BalanceGame />} />
          <Route path="/withbuddy/koreatour" element={<KoreaTour />} />
          
          <Route path="*" element={<NotFound404 />} />
        </Routes>    
      </div>
    </BrowserRouter>
  );
}

export default App;
