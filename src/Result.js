import React from 'react';
import { useLocation } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const { result } = location.state || { result: '결과를 계산할 수 없습니다.' };

  return (
    <div className="result-container">
      <h2>당신의 MBTI 유형은:</h2>
      <h1>{result}</h1>
      <p>MBTI 유형에 대한 설명을 여기에 추가할 수 있습니다.</p>
    </div>
  );
};

export default Result;