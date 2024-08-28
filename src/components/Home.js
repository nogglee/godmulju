import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ShareIcon } from '../assets/ico-share.svg';
import { collection, getDocs } from "firebase/firestore"; // Firestore 관련 함수 임포트
import { db } from '../firebase'; // Firebase Firestore 인스턴스 가져오기

const Home = () => {
  const navigate = useNavigate();
  const [participantCount, setParticipantCount] = useState(0); // 참여자 수 상태

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
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  useEffect(() => {
    // Firestore에서 참여자 수를 가져오는 함수
    const fetchParticipantCount = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const actualUserCount = querySnapshot.size; // Firestore에 저장된 실제 사용자 수
        const displayCount = 1642 + actualUserCount; // 기본 값 100에 실제 사용자 수를 더함
        setParticipantCount(displayCount);
      } catch (error) {
        console.error("참여자 수를 가져오는 중 오류 발생:", error);
      }
    };

    fetchParticipantCount();
  }, []); // 컴포넌트 마운트 시 한 번만 실행


  return (
    <div className="h-screen flex flex-col items-center">
      <div className="w-full h-full flex flex-col max-w-md bg-gray-100 items-center">
        <div className=" text-center flex flex-col px-4 items-center">
            <div className="sub-text font-body">그대는 어떤 건물을 가질 운명인가</div>
            <div className="font-title text-4xl md:text-5xl mb-8">갓물주 운명 테스트</div>
            <button onClick={handleShareClick} className="button-share flex flex-row font-title text-md gap-1 py-2 px-3 mb-12"><ShareIcon/>공유하기</button>
        </div>
        <img src='/images/bgHome.png' className="w-full"></img>
      </div>
      <div className="h-full w-full max-w-md px-4 py-8 bg-primary-400">
        <div className="w-full h-full flex flex-col items-center justify-start gap-12">
          <button onClick={startQuiz} className="button-start w-full bg-primary-400 text-white mx-2 py-2">시작하기</button>
          <div className="w-full flex flex-col items-center justify-between gap-6">
            <div className="line-home w-full"></div>
            <div className="flex flex-col items-center justify-between gap-3">
              <div className="font-title text-md text-white">누적 참여자 수</div>
              <div className="font-title text-3xl text-white">{participantCount.toLocaleString()}</div>
            </div>
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