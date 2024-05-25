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
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index={true} element={<Home/>} />
            <Route path="reset-password" element = {<ForgottenPassword/>} />
            <Route path="reset-password2" element = {<ForgottenPasswordNum/>} />
            <Route path="login" element = {<SignIn/>} />
            <Route path="signup" element = {<SignUp/>} />
            <Route path="quiz" element = {<Quiz/>} />
            <Route path="chap-quiz" element = {<ChaptersPageQuiz/>} />
            <Route path="chap-cours" element = {<ChaptersPageCours/>} />
            <Route path="matieres-cours" element = {<MatieresPageCours/>} />
            <Route path="matieres-quiz" element = {<MatieresPageQuiz/>} />
            <Route path="checkout" element = {<Checkout/>} />
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  </React.StrictMode>,
);

