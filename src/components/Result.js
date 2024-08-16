import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { mbtiData } from '../data/mbtiData';
import Header from './Header';
import CircularProgress from './CircularProgress';
import { db } from '../firebase'; // Firebase 설정을 import
import { collection, getDocs, query, where } from "firebase/firestore";

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


  return (
    <div className="h-screen flex flex-col justify-start items-center font-title">
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
        <div className="flex justify-around">
          {mbtiResult.traits.map((trait, index) => (
            <div key={`${trait.name}-${dashOffsets[index]}`} className="trait flex flex-col items-center">
            <h3>{trait.name}</h3>
            <div>
              <CircularProgress
                key={index}
                value={trait.value}
                dashOffset={dashOffsets[index]}
                circumference={circumference}
              />
            </div>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;
