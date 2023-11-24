import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import SigninPage from './components/pages/AuthPage/SigninPage';
import SignupPage from './components/pages/AuthPage/SignupPage';
import HomePage from './components/UI/templates/HomeTemplate/index';
import IDEPage from './components/pages/IDEPage';
import SolutionEditPage from './components/pages/SolutionEditPage';
import KakaoLogin from './components/pages/AuthPage/kakaologin';
import PasswordEmailPage from './components/pages/AuthPage/PasswordEmail';
import PasswordResetPage from './components/pages/AuthPage/PasswordReset';
import ProblemQuizzesPage from './components/pages/ProblemQuizzesPage';
import Test from './components/UI/molecules/CommentsSection';
import AuthLayer from './service/AuthLayer';
import ProblemDetail from './components/UI/molecules/ProblemDetail';
import Solutions from './components/UI/molecules/Solutions';
import Solution from './components/UI/molecules/Solution';
import Submits from './components/UI/molecules/Submits'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/problems/:problemId" element={<IDEPage />}>
          <Route path="description" element={<ProblemDetail />} />
          <Route path="solutions" element={<Solutions />} />
          <Route path="submits" element={<Submits />} />
          <Route path="solutions/:solutionId" element={<Solution />} />
        </Route>
        <Route
          path="problems/:problemId/quizzes"
          element={<ProblemQuizzesPage />}
        />
        <Route
          path="/problems/:problemId/solutions/:solutionId/edit"
          element={
            <AuthLayer>
              <SolutionEditPage />
            </AuthLayer>
          }
        />
        <Route path="/auth/signin/kakao" element={<KakaoLogin />} />
        <Route path="/password" element={<PasswordEmailPage />} />
        <Route path="/password/reset" element={<PasswordResetPage />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
