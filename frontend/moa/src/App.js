import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import store from './store';
import Cookies from 'js-cookie';

import Intro from './pages/Intro';
import Main from './pages/Main';
import Login from './pages/Login';
import LoginLoading from './pages/LoginLoading';
import SignUp from './pages/SignUp';
import Matching from './pages/Matching';
import ChattingHome from './components/ChattingHome';
import BuddyChattingModal from './pages/Chatting/BuddyChattingModal';
import OpenChattingModal from './pages/Chatting/OpenChattingModal';
import OpenChattingDetail from './pages/Chatting/OpenChattingDetail';
import KoreanLearning from './pages/Learning/KoreanLearning';
import LearningKeyword from './pages/Learning/LearningMyKeyword';
import WordLearning from './pages/Learning/WordLearning';
import KoreanLearningDefault from './pages/Learning/KoreanLearningDefault';
import NewsPlus from './pages/Learning/NewsPlus';
// import QnABoard from './pages/QnA/QnABoard';
import Quiz from './pages/Quiz/Quiz';
import QuestionPage from './pages/Quiz/QuestionPage';
import SentenceQuiz from './pages/Quiz/SentenceQuiz';
import IncorrectNote from './pages/Quiz/IncorrectNote';
import QuizResult from './pages/Quiz/QuizResult';
import ExchangeDiary from './pages/Buddy/Diary/ExchangeDiary';
import ExchangeDiaryDetail from './pages/Buddy/Diary/ExchangeDiaryDetail';
import CreateExchangeDiary from './pages/Buddy/Diary/CreateExchangeDiary';
import UpdateExchangeDiary from './pages/Buddy/Diary/UpdateExchangeDiary';
import BalanceGame from './pages/Buddy/BalanceGame/BalanceGame';
import BalanceGameDetail from './pages/Buddy/BalanceGame/BalanceGameDetail';
import CreateBalanceGame from './pages/Buddy/BalanceGame/CreateBalanceGame';
import UpdateBalanceGame from './pages/Buddy/BalanceGame/UpdateBalanceGame';
import KoreaTour from './pages/Buddy/KoreaTour';
import NotFound404 from './pages/NotFound404';
import RelatedNews from './components/Learning/RelatedNews';
import NewsArticle from './pages/Learning/NewsArticle';
import ExchangeDiaryContent from './pages/Buddy/Diary/ExchangeDiaryContent';

function App() {
  const state = store.getState();
  const accessToken = state.accessToken;
  const isMatching = state.isMatching;
  const refreshToken = Cookies.get('refreshToken');

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {refreshToken? ( // refreshToken이 있는 경우
            <>
              <Route path="/" element={<Main />} />

              <Route path="/matching" element={<Matching />} />

              <Route path="/chatting" element={<ChattingHome />} />
              <Route path="/chatting/buddy" element={<BuddyChattingModal />} />
              <Route path="/chatting/openchat" element={<OpenChattingModal />} />
              <Route path="/chatting/openchat/:id" element={<OpenChattingDetail />} />

              <Route path="/koreanlearning" element={<KoreanLearning />} />
              <Route path="/koreanlearning/word" element={<WordLearning />} />
              <Route path='/koreanlearning/word/news' element={<NewsPlus />} />
              <Route path='/koreanlearning/article' element={<NewsArticle />} />
              <Route path='/koreanlearning/keyword' element={<LearningKeyword />} />
              <Route path='/koreanlearning/default' element={<KoreanLearningDefault />} />

              <Route path="/quiz" element={<Quiz />} />
              <Route path="/quiz/question-page" element={<QuestionPage />} />
              <Route path="/quiz/sentence-quiz" element={<SentenceQuiz />} />
              <Route path="/quiz/incorrect-note" element={<IncorrectNote />} />
              <Route path="/quiz/quiz-result" element={<QuizResult />} />

              <Route path="/buddy/exchangediary" element={<ExchangeDiary />} />
              <Route path="/buddy/exchangediary/:exchangeDiaryDate" element={<ExchangeDiaryDetail />} />
              <Route path="/buddy/exchangediary/content" element={<ExchangeDiaryContent />} />
              <Route path="/buddy/exchangediary/create" element={<CreateExchangeDiary />} />
              <Route path="/buddy/exchangediary/:id/update" element={<UpdateExchangeDiary />} />

              <Route path="/buddy/balancegame" element={<BalanceGame />} />
              <Route path="/buddy/balancegame/:id" element={<BalanceGameDetail />} />
              <Route path="/buddy/balancegame/create" element={<CreateBalanceGame />} />
              <Route path="/buddy/balancegame/:id/update" element={<UpdateBalanceGame />} />

              <Route path="/buddy/koreatour" element={<KoreaTour />} />

              <Route path="*" element={<Navigate to="/" />} />
            </>
          ) : ( // refreshToken이 없는 경우
            <>
              <Route path="/intro" element={<Intro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/login-load" element={<LoginLoading />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/*" element={<Navigate to="/intro" />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
