import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { mbtiData } from '../data/mbtiData';
import Header from './Header';
import { db } from '../firebase'; // Firebase 설정을 import
import { collection, getDocs, query, where } from "firebase/firestore";

const Result = () => {
  const location = useLocation();
  const { result, userInfo } = location.state || {}; // MBTI 결과와 사용자 정보
  const mbtiResult = mbtiData.find(item => item.mbti === result);
  const [percentage, setPercentage] = useState(0); // 비율을 저장할 상태
  const navigate = useNavigate();

  const radius = 45; // 반지름
  const circumference = 2 * Math.PI * radius; // 원 둘레

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
    // mbtiResult가 없으면 홈 페이지로 리다이렉트
    if (!mbtiResult) {
      navigate('/');
      return;
    }

    // 애니메이션 트리거
    const timeOutId = setTimeout(() => {
      setDashOffsets(
        mbtiResult.traits.map(trait => 
          circumference - (trait.value / 100) * circumference
        )
      );
    }, 100); // 살짝 지연을 줘서 자연스럽게 애니메이션이 트리거됨

    return () => clearTimeout(timeOutId);
  }, [circumference, mbtiResult.traits, navigate]);

  return (
    <div className="h-screen flex flex-col justify-start items-center font-title">
      {/* Header */}
      <Header />

      {/* 결과 컨텐츠 */}
      <div className="flex flex-col h-full max-w-md w-full bg-gray-100 py-5 px-8 font-title gap-4 items-center whitespace-pre-line">
        <div className='text-gray-600 text-md'>내 건물의 이름은</div>
        <div><img src={mbtiResult.buildingName} alt={`${result} 이미지`} /></div>
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

        {/* 나와 같은 유형 비율 표시 */}
        <div className="mt-8 text-center">
          <p>나와 같은 유형의 사람은 전체의 <strong>{percentage}%</strong>입니다.</p>
        </div>
      </div>
    </div>
  );
};

export default Result;