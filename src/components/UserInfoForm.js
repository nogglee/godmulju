import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import { collection, addDoc, query, where, getDocs, doc, setDoc } from "firebase/firestore"; // Firestore 관련 함수 임포트
import { db } from '../firebase'; // Firebase Firestore 인스턴스 가져오기


const UserInfoForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [age, setAge] = useState('20대');
  const [role, setRole] = useState('');
  const isFormValid = age && role;

  const handleConfirm = async () => {
    if (isFormValid) {
      const userInfo = { age, role };
      const answers = location.state.answers;

      // 최종 결과 계산
      const result =
        (answers.I >= answers.E ? 'I' : 'E') +
        (answers.S >= answers.N ? 'S' : 'N') +
        (answers.T >= answers.F ? 'T' : 'F') +
        (answers.J >= answers.P ? 'J' : 'P');
      // Firebase에 데이터 저장 로직
      try {
        // IP 주소를 기준으로 중복된 데이터를 확인
        const userIp = await fetch('https://api.ipify.org?format=json')
          .then(response => response.json())
          .then(data => data.ip);

        const userCollection = collection(db, "users");
        const userQuery = query(userCollection, where("ip", "==", userIp));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          // IP가 이미 존재하면 해당 문서를 업데이트
          querySnapshot.forEach(async (docSnapshot) => {
            const docRef = doc(db, "users", docSnapshot.id);
            await setDoc(docRef, {
              age,
              role,
              answers,
              result,
              ip: userIp,
              timestamp: new Date()
            }, { merge: true });
          });
        } else {
          // 새로 데이터를 추가
          await addDoc(userCollection, {
            age,
            role,
            answers,
            result,
            ip: userIp,
            timestamp: new Date()
          });
        }

        // 저장 후 결과 페이지로 이동
        navigate('/result', { state: { result, userInfo } });
      } catch (error) {
        console.error("데이터 저장 중 오류 발생:", error);
      }
    } else {
      console.log("폼 유효성 통과 못함");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-start items-center font-title">
      {/* Header */}
      <Header />

      {/* 결과 컨텐츠 */}
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
                임차인
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
                임대인
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