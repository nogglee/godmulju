import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { mbtiData } from '../data/mbtiData';
import Header from './Header';

const Result = () => {
  const location = useLocation();
  const { result, userInfo } = location.state || {}; // MBTI 결과와 사용자 정보
  const mbtiResult = mbtiData.find(item => item.mbti === result);

  const radius = 45; // 반지름
  const circumference = 2 * Math.PI * radius; // 원 둘레

  // 모든 trait의 애니메이션 상태를 관리
  const [dashOffsets, setDashOffsets] = useState(
    mbtiResult.traits.map(() => circumference)
  );

  useEffect(() => {
    // 컴포넌트가 마운트되면서 애니메이션 시작
    setDashOffsets(
      mbtiResult.traits.map(trait => 
        circumference - (trait.value / 100) * circumference
      )
    );
  }, [circumference, mbtiResult.traits]);

  return (
    <div className="h-screen flex flex-col justify-start items-center font-title">
      {/* Header */}
      <Header />

      {/* 결과 컨텐츠 */}
      <div className="flex flex-col h-full max-w-md w-full bg-gray-100 py-20 px-8 font-title gap-1">
        <h2>{mbtiResult.buildingName}</h2>
        <div>
          <img src={`/images/${result}.png`} alt={`${result} 이미지`} />
        </div>
        <div className="flex justify-around">
          {mbtiResult.traits.map((trait, index) => (
            <div key={index} className="trait flex flex-col items-center">
              <h3>{trait.name}</h3>
              <div className="circle-chart relative">
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#F28302"
                    strokeWidth="10"
                    strokeDasharray={circumference}
                    strokeDashoffset={dashOffsets[index]}
                    style={{
                      transition: 'stroke-dashoffset 2s ease-in-out',
                      transform: 'rotate(0deg)',
                      transformOrigin: '50% 50%',
                    }}
                  />
                </svg>
                <span className="absolute inset-0 flex justify-center items-center font-bold text-black text-lg">
                  {trait.value}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;