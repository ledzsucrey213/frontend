// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Home from './pages/home';
import SignIn from './pages/login';
import SignUp from './pages/signup';
import ForgottenPassword from './pages/forgottenPassword';
import ForgottenPasswordNum from './pages/forgottenPasswordNum';
import Quiz from './pages/quiz';
import ChaptersPageQuiz from './pages/chapitresQuiz';
import ChaptersPageCours from './pages/chapitresCours';
import MatieresPageCours from './pages/matieresCours';
import MatieresPageQuiz from './pages/matieresQuiz';
import Checkout from './pages/checkout/checkout';
import Settings from './pages/settings';
import Progress from './pages/progress';
import ScoreDetails from './pages/scoreDetails';
import { AuthContextProvider } from './context/AuthContext';
import Modo from './pages/modo';
import ChapterDetails from './pages/chapterDetails';
import SignupSuccessAnimation from './components/SignupSuccessAnimation';
import Layout from './components/Layout';  // Importer le composant Layout
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index={true} element={<Layout><Home /></Layout>} />
            <Route path="reset-password" element={<Layout><ForgottenPassword /></Layout>} />
            <Route path="reset-password2" element={<Layout><ForgottenPasswordNum /></Layout>} />
            <Route path="login" element={<Layout><SignIn /></Layout>} />
            <Route path="signup" element={<Layout><SignUp /></Layout>} />
            <Route path="quiz" element={<Layout><Quiz /></Layout>} />
            <Route path="chap-quiz" element={<Layout><ChaptersPageQuiz /></Layout>} />
            <Route path="chap-cours" element={<Layout><ChaptersPageCours /></Layout>} />
            <Route path="matieres-cours" element={<Layout><MatieresPageCours /></Layout>} />
            <Route path="matieres-quiz" element={<Layout><MatieresPageQuiz /></Layout>} />
            <Route path="checkout" element={<Layout><Checkout /></Layout>} />
            <Route path="settings" element={<Layout><Settings /></Layout>} />
            <Route path="progress" element={<Layout><Progress /></Layout>} />
            <Route path="score/:scoreId" element={<Layout><ScoreDetails /></Layout>} />
            <Route path="/signup-success" element={<Layout><SignupSuccessAnimation /></Layout>} />
            <Route path="/modo" element={<Layout><Modo /></Layout>} />
            <Route path="/chapitre/:chapterId" element={<Layout><ChapterDetails /></Layout>} />
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  </React.StrictMode>,
);
