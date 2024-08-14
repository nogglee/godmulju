import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Quiz from './Quiz';
import UserInfoForm from './UserInfoForm'; // 사용자 정보 입력 컴포넌트
import Result from './Result'; // 결과 컴포넌트
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/user-info" element={<UserInfoForm />} />
        <Route path="/result" element={<Result />} />  
      </Routes>
    </Router>
  );
};

export default App;
