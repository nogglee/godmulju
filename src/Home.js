import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div class="h-screen flex justify-center items-center">
      <div class="w-full h-full max-w-5xl bg-white">
        <div class="w-full h-full max-w-md md:max-w-full bg-gray-400">
          <div className="home-container">
            <h1>갓물주 운명 테스트</h1>
            <p>당신은 과연 건물을 가질 수 있을까요?</p>
            <button onClick={startQuiz}>시작하기</button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Home;