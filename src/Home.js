import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div class="h-screen flex flex-col items-center">
    
    <div id="header" class="w-full h-16 max-w-md bg-primary-400 flex justify-center items-center">
      <h2 class="text-white">헤더 텍스트</h2>
    </div>
  
    <div class="w-full h-full flex-grow max-w-md bg-gray-100 flex justify-center">
      <div class=" text-center flex flex-col justify-between h-full py-20">
        <div class="grid gap-8 py-4">
          <div class="font-title text-4xl">갓물주 운명 테스트</div>
          <div class="font-body text-xl">당신은 과연 건물을 가질 수 있을까요?</div>
        </div>
        <button onClick={startQuiz} class="w-full min-h-16 bg-primary-400 text-white mx-2 py-2 rounded">시작하기</button>
      </div>
    </div>
  </div>
    
  );
};

export default Home;