import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';

const UserInfoForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [age, setAge] = useState('20대');
  const [role, setRole] = useState('');
  const isFormValid = age && role;

  const handleConfirm = () => {
    if (isFormValid) {
      const userInfo = { age, role };
      const answers = location.state.answers;

      // 최종 결과 계산
      const result =
        (answers.I >= answers.E ? 'I' : 'E') +
        (answers.S >= answers.N ? 'S' : 'N') +
        (answers.T >= answers.F ? 'T' : 'F') +
        (answers.J >= answers.P ? 'J' : 'P');

      // Result 페이지로 이동하면서 결과와 사용자 정보를 전달
      navigate('/result', { state: { result, userInfo } });
    }
  };

  return (
    <div className="h-screen flex flex-col justify-start items-center font-title">
      {/* Header */}
      <Header />

      {/* 결과 컨텐츠 */}
      <div className="flex flex-col items-center h-full max-w-md w-full bg-gray-100 py-20 px-8 font-title gap-1">
        <div className='text-xl md:text-2xl text-center'>아래 정보를 입력하면<br/>더 어울리는 건물을 알 수 있어요!</div>
        <div className="form-group">
          <select value={age} onChange={(e) => setAge(e.target.value)} className='select-form'>
            <option value="10대">10대</option>
            <option value="20대">20대</option>
            <option value="30대">30대</option>
            <option value="40대">40대</option>
            <option value="50대 이상">50대 이상</option>
          </select>
        </div>

        <div className="form-group">
          <label>나는 지금</label>
          <div className="flex flex-row">
            <label>
              <input
                type="radio"
                name="role"
                value="임차인"
                checked={role === '임차인'}
                onChange={(e) => setRole(e.target.value)}
              />
              임차인
            </label>
            <label>
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