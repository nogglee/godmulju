import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ShareIcon } from './assets/ico-share.svg';

const Home = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div class="h-screen flex flex-col items-center">
      <div class="w-full h-full flex flex-col max-w-md bg-gray-100 items-center">
        <div class=" text-center flex flex-col px-4 items-center">
            <div class="sub-text font-body">그대는 어떤 건물을 가질 운명인가</div>
            <div class="font-title text-4xl md:text-5xl mb-10">갓물주 운명 테스트</div>
        </div>
        <img src='/images/bgHome.png' class="w-full"></img>
      </div>
      <div class="h-full w-full max-w-md px-4 py-12 bg-primary-400">
        <div class="w-full h-full flex flex-col items-center justify-center gap-12">
          <button onClick={startQuiz} class="button-start w-full bg-primary-400 text-white mx-2 py-2">시작하기</button>
          <div class="w-full flex flex-col items-center justify-between gap-8">
            <div class="flex flex-col items-center justify-between gap-3">
              <div class="font-title text-md text-white">누적 참여자 수</div>
              <div class="font-title text-3xl text-white">1,000,000</div>
            </div>
            <div class="line-home w-full"></div>
            <button class="button-share flex flex-row font-title text-md gap-1 py-2 px-3"><ShareIcon/>공유하기</button>
          </div>
        </div>
      </div>
  </div>
    
  );
};

export default Home;