import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as HomeIcon } from '../assets/ico-home.svg';

const Header = () => {
  
  const navigate = useNavigate();
  const location = useLocation();

  // 뒤로가기
  const handleBackClick = () => {
    navigate('/');
  };

  // Result 페이지인지 확인
  const isResultPage = location.pathname === '/result';

  return(
    <div id="header" className={`w-full h-16 max-w-md flex justify-center items-center text-md text-white relative ${isResultPage ? 'bg-black' : 'bg-primary-400'}`}>
      <button onClick={handleBackClick} className="absolute left-8 cursor-pointer">
        <HomeIcon />
      </button>
      갓물주 운명 테스트
    </div>
  );

};

export default Header;



