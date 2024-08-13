import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="home-container">
      <h1>갓물주 운명 테스트</h1>
      <p>당신은 과연 건물을 가질 수 있을까요?</p>
      <button onClick={startQuiz}>시작하기</button>
    </div>
  );
};

export default Home;