import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Intro from './pages/Intro';
import Main from './pages/Main';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ChattingHome from './pages/Chatting/ChattingHome';
import OpenChattingDetail from './pages/Chatting/OpenChattingDetail';
import KoreanLearning from './pages/Learning/KoreanLearning';
import QnABoard from './pages/QnA/QnABoard';
import Quiz from './pages/Quiz/Quiz';
import IncorrectNote from './pages/Quiz/IncorrectNote';
import BuddyHome from './pages/Buddy/BuddyHome';
import ExchangeDiary from './pages/Buddy/ExchangeDiary';
import ExchangeDiaryDetail from './pages/Buddy/ExchangeDiaryDetail';
import CreateExchangeDiary from './pages/Buddy/CreateExchangeDiary';
import UpdateExchangeDiary from './pages/Buddy/UpdateExchangeDiary';
import BalanceGame from './pages/Buddy/BalanceGame/BalanceGame';
import BalanceGameDetail from './pages/Buddy/BalanceGame/BalanceGameDetail';
import CreateBalanceGame from './pages/Buddy/BalanceGame/CreateBalanceGame';
import UpdateBalanceGame from './pages/Buddy/BalanceGame/UpdateBalanceGame';
import KoreaTour from './pages/Buddy/KoreaTour';
import MyPage from './pages/MyPage/MyPage';
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

          <Route path="/chatting" element={<ChattingHome />}/>
          <Route path="/chatting/openchat/:id" element={<OpenChattingDetail />}/>

          <Route path="/koreanlearning" element={<KoreanLearning />} />

          <Route path="/qna-board" element={<QnABoard />} />
          
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz/incorrect-note" element={<IncorrectNote />} />

          <Route path="/buddy" element={<BuddyHome />} />

          <Route path="/buddy/exchangediary" element={<ExchangeDiary />} />
          <Route path="/buddy/exchangediary/:id" element={<ExchangeDiaryDetail />} />
          <Route path="/buddy/exchangediary/create" element={<CreateExchangeDiary />} />
          <Route path="/buddy/exchangediary/:id/update" element={<UpdateExchangeDiary />} />

          <Route path="/buddy/balancegame" element={<BalanceGame />} />
          <Route path="/buddy/balancegame/:id" element={<BalanceGameDetail />} />
          <Route path="/buddy/balancegame/create" element={<CreateBalanceGame />} />
          <Route path="/buddy/balancegame/:id/update" element={<UpdateBalanceGame />} />

          <Route path="/buddy/koreatour" element={<KoreaTour />} />

          <Route path="/mypage" element={<MyPage />} />
          
          <Route path="*" element={<NotFound404 />} />
        </Routes>    
      </div>
    </BrowserRouter>
  );
}

export default App;
