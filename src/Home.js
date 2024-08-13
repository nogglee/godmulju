import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="home-container">
      <h1>심리테스트에 오신 것을 환영합니다!</h1>
      <p>12가지 질문을 통해 당신의 MBTI 유형을 알아보세요.</p>
      <button onClick={startQuiz}>시작하기</button>
    </div>
  );
};

export default Home;