import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { mbtiData } from '../data/mbtiData';
import Header from './Header';
import CircularProgress from './CircularProgress';
import { db } from '../firebase'; // Firebase 설정을 import
import { collection, getDocs, query, where } from "firebase/firestore";
import { ReactComponent as ShareIcon } from '../assets/ico-share-gray.svg';
import ReactGA from "react-ga4";

// Google Analytics 초기화
ReactGA.initialize("G-K9N1CJPHCS"); // 측정 ID는 GA4 설정에서 확인

const Result = () => {
  const location = useLocation();
  const { result} = location.state || {}; // MBTI 결과와 사용자 정보
  const mbtiResult = mbtiData.find(item => item.mbti === result);
  const [percentage, setPercentage] = useState(0); // 비율을 저장할 상태
  const navigate = useNavigate();

  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  // 모든 trait의 애니메이션 상태를 관리
  const [dashOffsets, setDashOffsets] = useState(
    mbtiResult.traits.map(() => circumference)
  );


  // 비율 계산을 위한 useEffect
useEffect(() => {
  const calculatePercentage = async () => {
    try {
      // Firestore의 "users" 컬렉션에서 모든 문서를 가져옴
      const userCollection = collection(db, "users");
      const allDocs = await getDocs(userCollection);

      // 특정 MBTI 유형의 응답만 필터링
      const matchingDocs = await getDocs(query(userCollection, where("result", "==", result)));

      // 비율 계산
      const totalUsers = allDocs.size;
      const matchingUsers = matchingDocs.size;
      const percentage = (matchingUsers / totalUsers) * 100;

      // 계산된 비율을 소수점 두 자리까지 반올림하여 상태에 저장
      setPercentage(percentage.toFixed(2));
    } catch (error) {
      console.error("비율 계산 중 오류 발생:", error);
    }
  };

    if (result) {
      calculatePercentage();
    }
  }, [result]);

  // 애니메이션을 위한 useEffect
  useEffect(() => {
    if (!mbtiResult) {
      navigate('/');
      return;
    }

    const offsets = mbtiResult.traits.map(trait =>
      circumference - (trait.value / 100) * circumference
    );
    setDashOffsets(offsets);

    console.log("Updated Offsets:", offsets);
  }, [circumference, mbtiResult, navigate]);
  
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

  const landingClick = () => {
  
  //   // 이벤트 전송
  // ReactGA.event({
  //   category: "Button", // 이벤트 카테고리
  //   action: "Click", // 이벤트 액션
  //   label: "Go To Landing", // 추가로 구체적인 설명을 원할 경우 라벨 사용
  // });
  
  // gtag 이벤트 전송
  window.gtag('event', 'Click', {
    event_category: 'Button',
    event_label: 'Go To Landing',
    value: 1,
  });

    window.open('https://ddabu-rending.vercel.app/');
  };

  

  
  return (
    <div className="min-h-screen flex flex-col justify-start items-center font-title">
      {/* Header */}
      <Header />

      {/* 결과 컨텐츠 */}
      <div className="flex flex-col h-full max-w-md w-full bg-white py-5 px-4 font-title gap-4 items-center whitespace-pre-line">
        <div className='text-gray-600 text-md'>내 건물의 이름은</div>
        <div>
          <img src={mbtiResult.buildingName} />
        </div>
        <div className="text-center font-body font-bold flex flex-row items-center">
          <div className='text-sm text-gray-300 mr-1'>전체 테스트 참여자 중</div>
          <div className='bg-primary-400 text-md text-white px-1'>{percentage}%</div>
          <div className='text-sm text-gray-300 ml-1'>가 같은 유형입니다.</div>
        </div>
        <div>
          <img src={`/images/${result}.png`} alt={`${result} 이미지`} />
        </div>
        <div className='text-md text-gray-600'>{mbtiResult.typeName}</div>
        <div className="flex w-full px-4 md:px-11">
          {mbtiResult.traits.map((trait, index) => (
            <div key={`${trait.name}-${dashOffsets[index]}`} className="trait flex flex-col items-center w-full text-xs">
            <div>{trait.name}</div>
            <div className=''>
              <CircularProgress
                key={`${index}-${dashOffsets[index]}`}
                value={trait.value}
                dashOffset={dashOffsets[index]}
                circumference={circumference}
              />
            </div>
          </div>
          ))}
        </div>
        <button onClick={landingClick} className="button-landing flex flex-row font-body font-bold text-xs items-center justify-center gap-1 py-2 px-3 h-11">부동산 직거래 더 알아보기</button>
        <button onClick={handleShareClick} className="flex flex-row font-body font-bold text-gray-400 text-xs items-center justify-center gap-1 py-2 px-3 mb-12 h-9 md:h-11"><ShareIcon/>테스트 공유하기</button>
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

export default Result;
