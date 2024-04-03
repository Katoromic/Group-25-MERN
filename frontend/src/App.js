import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage';
<<<<<<< Updated upstream
import LoginForm from './components/LoginForm';
import CardUI from './components/CardUI';
import Unverified from './pages/Unverified';
=======
import LoginPage from './pages/LoginPage';
import DashBoard from './pages/DashboardPage';
import Unverified from './pages/Unverified';
import QuestionPage from './pages/QuestionPage';
import ForgotPassword from './pages/ForgotPassword';
>>>>>>> Stashed changes

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/login" index element={<LoginPage />} />
        <Route path="/signup" index element={<SignupPage />} />
<<<<<<< Updated upstream
        <Route path="/landing" index element={<CardUI />} />
        <Route path="/unverified" index element={<Unverified />} />
=======
        <Route path="/landing" index element={<DashBoard />} />
        <Route path="/unverified" index element={<Unverified />} />
        <Route path="/Questions" index element={<QuestionPage />} />
        <Route path="/PassRecover" index element={<ForgotPassword />} />
>>>>>>> Stashed changes
      </Routes>
    </BrowserRouter>
  );
}

export default App;
