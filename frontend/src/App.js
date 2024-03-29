import React from 'react';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LoginForm from './components/LoginForm';
import CardUI from './components/CardUI';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<LoginPage />} />
        <Route path="/login" index element={<LoginForm />} />
        <Route path="/signup" index element={<SignupPage />} />
        <Route path="/landing" index element={<CardUI />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
