import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Intro from './pages/Intro';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import KoreanLearning from './pages/Learning/KoreanLearning';
import Quiz from './pages/Quiz/Quiz';
import IncorrectNote from './pages/Quiz/IncorrectNote';
import WithBuddy from './pages/WithBuddy/WithBuddy';
import ExchangeDiary from './pages/WithBuddy/ExchangeDiary';
import ExchangeDiaryDetail from './pages/WithBuddy/ExchangeDiaryDetail';
import CreateExchangeDiary from './pages/WithBuddy/CreateExchangeDiary';
import UpdateExchangeDiary from './pages/WithBuddy/UpdateExchangeDiary';
import BalanceGame from './pages/WithBuddy/BalanceGame';
import BalanceGameDetail from './pages/WithBuddy/BalanceGameDetail';
import CreateBalanceGame from './pages/WithBuddy/CreateBalanceGame';
import UpdateBalanceGame from './pages/WithBuddy/UpdateBalanceGame';
import KoreaTour from './pages/WithBuddy/KoreaTour';
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
          <Route path="/quiz/incorrect-note" element={<IncorrectNote />} />

          <Route path="/withbuddy" element={<WithBuddy />} />

          <Route path="/withbuddy/exchangediary" element={<ExchangeDiary />} />
          <Route path="/withbuddy/exchangediary/:id" element={<ExchangeDiaryDetail />} />
          <Route path="/withbuddy/exchangediary/create" element={<CreateExchangeDiary />} />
          <Route path="/withbuddy/exchangediary/:id/update" element={<UpdateExchangeDiary />} />

          <Route path="/withbuddy/balancegame" element={<BalanceGame />} />
          <Route path="/withbuddy/balancegame/:id" element={<BalanceGameDetail />} />
          <Route path="/withbuddy/balancegame/create" element={<CreateBalanceGame />} />
          <Route path="/withbuddy/balancegame/:id/update" element={<UpdateBalanceGame />} />

          <Route path="/withbuddy/koreatour" element={<KoreaTour />} />
          
          <Route path="*" element={<NotFound404 />} />
        </Routes>    
      </div>
    </BrowserRouter>
  );
}

export default App;
