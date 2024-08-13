import React from 'react';
import { useLocation } from 'react-router-dom';
import { mbtiData } from './data/mbtiData';

const Result = () => {
  const location = useLocation();
  const result = location.state.result; // MBTI 결과
  const mbtiResult = mbtiData.find(item => item.mbti === result); // 해당 MBTI 데이터 찾기

  const radius = 45; // 반지름
  const circumference = 2 * Math.PI * radius; // 원 둘레

  return (
    <div className="result-container">
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
                  stroke="#4caf50" // 원하는 색상으로 변경 가능
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
    </div>
  );
};

export default Result;