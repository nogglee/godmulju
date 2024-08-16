import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as BackIcon } from '../assets/ico-arrow-left.svg';

const Header = () => {
  
  const navigate = useNavigate();
  const location = useLocation();

  // 뒤로가기
  const handleBackClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/'); // 메인 페이지로 이동
    }
    console.log("뒤로가기 버튼이 클릭됨");
  };

  // Result 페이지인지 확인
  const isResultPage = location.pathname === '/result';

  return(
    <div id="header" className={`w-full h-16 max-w-md flex justify-center items-center text-md text-white relative ${isResultPage ? 'bg-black' : 'bg-primary-400'}`}>
      
      {/* 뒤로가기 버튼은 result 페이지에서 숨김 처리 */}
      {!isResultPage && (
        <button onClick={handleBackClick} className="absolute left-4 cursor-pointer">
          <BackIcon />
        </button>
      )}
      갓물주 운명 테스트
    </div>
  );

};

export default Header;



