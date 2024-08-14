import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

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
    <div className="user-info-form">
      <h2>아래 정보를 입력하면 더 어울리는 건물을 알 수 있어요!</h2>
      <div className="form-group">
        <label>나이</label>
        <select value={age} onChange={(e) => setAge(e.target.value)}>
          <option value="10대">10대</option>
          <option value="20대">20대</option>
          <option value="30대">30대</option>
          <option value="40대">40대</option>
          <option value="50대 이상">50대 이상</option>
        </select>
      </div>

      <div className="form-group">
        <label>나는 지금</label>
        <div>
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
  );
};

export default UserInfoForm;