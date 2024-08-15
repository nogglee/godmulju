import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ShareIcon } from '../assets/ico-share.svg';

const Home = () => {
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate('/quiz');
  };

  const [showToast, setShowToast] = useState(false);

  const handleShareClick = () => {
    // 지정된 URL을 클립보드에 복사
    const urlToCopy = 'https://godmulju.vercel.app/';
    navigator.clipboard.writeText(urlToCopy).then(() => {
      // 링크가 복사되면 토스트 메시지 표시
      setShowToast(true);
      
      // 3초 후 토스트 메시지 숨기기
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
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
            <button onClick={handleShareClick} class="button-share flex flex-row font-title text-md gap-1 py-2 px-3"><ShareIcon/>공유하기</button>
          </div>
        </div>
      </div>

      {/* 토스트 메시지 */}
      {showToast && (
        <div className="toast">
          링크가 복사되었습니다!
        </div>
      )}
  </div>
    
  );
};

export default Home;