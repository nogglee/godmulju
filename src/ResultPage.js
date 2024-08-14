import React, { useState } from 'react';
import UserInfoForm from './UserInfoForm';
import Result from './Result';

const ResultPage = () => {
  const [userInfo, setUserInfo] = useState(null);

  const handleUserInfoConfirm = (info) => {
    setUserInfo(info);
  };

  return (
    <div>
      {!userInfo ? (
        <UserInfoForm onConfirm={handleUserInfoConfirm} />
      ) : (
        <Result />
      )}
    </div>
  );
};

export default ResultPage;