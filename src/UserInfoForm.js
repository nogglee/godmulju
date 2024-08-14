import React, { useState } from 'react';

const UserInfoForm = ({ onConfirm }) => {
  const [age, setAge] = useState('20대'); // 드롭다운 기본값 20대
  const [role, setRole] = useState(''); // 라디오 버튼 기본값 선택 안됨
  const isFormValid = age && role; // 드롭다운과 라디오 버튼이 모두 선택되었는지 확인

  const handleConfirm = () => {
    if (isFormValid) {
      // onConfirm 함수에 선택된 데이터를 전달
      onConfirm({ age, role });
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
        disabled={!isFormValid} // 드롭다운과 라디오 버튼이 선택되지 않으면 비활성화
      >
        내 건물 확인하기
      </button>
    </div>
  );
};

export default UserInfoForm;