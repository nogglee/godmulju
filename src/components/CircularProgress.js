import React from 'react';

const CircularProgress = ({value, dashOffset, circumference}) => {

  const radius = 40;

  return (
    <div className="relative flex justify-center items-center">
      {/* 배경 원 */}
      <svg width="90" height="90" className="absolute">
        <circle
          cx="45"
          cy="45"
          r={radius}
          fill="none"
          stroke="#FFF2DE"
          strokeWidth="10"
        />
      </svg>

      {/* 그라데이션 PNG를 사용 */}
      <svg width="90" height="90" className="absolute" viewBox="0 0 90 90">
        <defs>
          <mask
            id={`progress-mask-${value}`}>
            <circle
              cx="45"
              cy="45"
              r={radius}
              fill="none"
              stroke="white"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round" // 선 끝을 둥글게 처리
              style={{
                transform: 'rotate(-90deg)',
                transformOrigin: '45px 45px',
                transition: 'stroke-dashoffset 10s cubic-bezier(0.4, 0.0, 0.2, 1)',
              }}
            />
          </mask>
        </defs>
        <image
          href="/images/gradient.png"
          x="0"
          y="0"
          width="90"
          height="90"
          mask={`url(#progress-mask-${value})`}
        />
      </svg>

      {/* 중앙 원 */}
      <div
        className="absolute w-[73px] h-[73px] rounded-full bg-white shadow-[2px_2px_4px_0_rgba(251,149,4,0.25)]"></div>

      {/* 값 표시 */}
      <div className="absolute font-title text-xs">{value}%</div>
    </div>
  );
};

export default CircularProgress;
