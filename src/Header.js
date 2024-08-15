import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as BackIcon } from './assets/ico-arrow-left.svg';

const Header = () => {
  
  const navigate = useNavigate();

  // 뒤로가기
  const handleBackClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/'); // 메인 페이지로 이동
    }
    console.log("뒤로가기 버튼이 클릭됨");
    
  };

  return(
    <div id="header" class="w-full h-16 max-w-md bg-primary-400 flex justify-center items-center text-md text-white relative">
      <button onClick={handleBackClick} className="absolute left-4 cursor-pointer"><BackIcon/></button>
      갓물주 운명 테스트
    </div>
  );

};

export default Header;
