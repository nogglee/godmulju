import React from 'react';
import { useLocation } from 'react-router-dom';
import { mbtiData } from './data/mbtiData';
import Header from './Header';

const Result = () => {
  
  const location = useLocation();
  const { result, userInfo } = location.state || {}; // MBTI 결과와 사용자 정보
  const mbtiResult = mbtiData.find(item => item.mbti === result); 

  const radius = 45; // 반지름
  const circumference = 2 * Math.PI * radius; // 원 둘레

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
          <div className="traits">
            {mbtiResult.traits.map((trait, index) => (
              <div key={index} className="trait">
                <h3>{trait.name}</h3>
                <div className="circle-chart">
                  <svg width="100" height="100">
                    <circle
                      cx="50%"
                      cy="50%"
                      r={radius}
                      fill="none"
                      stroke="#e6e6e6"
                      strokeWidth="10"
                    />
                    <circle
                      cx="50%"
                      cy="50%"
                      r={radius}
                      fill="none"
                      stroke="#4caf50"
                      strokeWidth="10"
                      strokeDasharray={circumference}
                      strokeDashoffset={
                        circumference - (trait.value / 100) * circumference
                      }
                      style={{
                        transition: "stroke-dashoffset 1s ease",
                      }}
                    />
                  </svg>
                  <span>{trait.value}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="user-info-summary">
            <p>나이: {userInfo.age}</p>
            <p>역할: {userInfo.role}</p>
          </div>
        
      </div>
    </div>
  );
};

export default Result;