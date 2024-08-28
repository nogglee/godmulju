import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import { collection, addDoc, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { db } from '../firebase';

const UserInfoForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [age, setAge] = useState('20대');
  const [role, setRole] = useState('');
  const isFormValid = age && role;

  // `Quiz.js`에서 전달된 `answers`와 `specificAnswers`를 가져옵니다.
  const { answers, specificAnswers } = location.state || {};

  const handleConfirm = async () => {
    if (isFormValid) {
      const userInfo = { age, role };

      const result =
        (answers.I >= answers.E ? 'I' : 'E') +
        (answers.S >= answers.N ? 'S' : 'N') +
        (answers.T >= answers.F ? 'T' : 'F') +
        (answers.J >= answers.P ? 'J' : 'P');

      try {
        // IP 주소를 가져오기
        const userIp = await fetch('https://ipapi.co/ip/')
          .then(response => response.text()); // .text()를 사용하여 IP만 가져옵니다.

        const userCollection = collection(db, "users");
        const referrer = document.referrer; // 유입 경로

        // 새 데이터 추가
        await addDoc(userCollection, {
          age,
          role,
          result,
          specificAnswers: {
            '전자문서 계약 여부': specificAnswers.question1, 
            '부동산 직거래 의향': specificAnswers.question2, 
          },
          ip: userIp,
          referrer,
          timestamp: new Date()
        });

        // 결과 페이지로 이동
        navigate('/result', { state: { result, userInfo, specificAnswers } });
      } catch (error) {
        console.error("데이터 저장 중 오류 발생:", error);
        alert('데이터를 저장하는 중 문제가 발생했습니다. 다시 시도해 주세요.');
      }
    } else {
      console.log("폼 유효성 통과 못함");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-start items-center font-title">
      <Header />
      <div className="flex flex-col items-center h-full max-w-md w-full bg-gray-100 py-20 px-8 font-title gap-1">
        <div className='text-xl md:text-2xl text-center mb-4'>아래 정보를 입력하면<br/>더 어울리는 건물을 알 수 있어요!</div>
        
        <select value={age} onChange={(e) => setAge(e.target.value)}>
          <option value="10대">10대</option>
          <option value="20대">20대</option>
          <option value="30대">30대</option>
          <option value="40대">40대</option>
          <option value="50대 이상">50대 이상</option>
        </select>
        
        <div className="w-full mt-10">
          <label className="text-lg">나는 지금</label>
          <div className="flex flex-row gap-4 justify-between">
            <div className='info-label-box'>
              <label className='info-label'>
                <input
                  type="radio"
                  name="role"
                  value="임차인"
                  checked={role === '임차인'}
                  onChange={(e) => setRole(e.target.value)}
                />
                세입자
              </label>
            </div>
            <div className='info-label-box'>
              <label className='info-label'>
                <input
                  type="radio"
                  name="role"
                  value="임대인"
                  checked={role === '임대인'}
                  onChange={(e) => setRole(e.target.value)}
                />
                집주인
              </label>
            </div>
          </div>
        </div>

        <button
          className="confirm-button"
          onClick={handleConfirm}
          disabled={!isFormValid} 
        >
          내 건물 확인하기
        </button> 
      </div>  
    </div>
  );
};

export default UserInfoForm;