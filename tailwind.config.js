/** @type {import('tailwindcss').Config} */
// tailwind.config.js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['yg-jalnan', 'sans-serif'], // 타이틀 폰트 패밀리 설정
        body: ['Pretendard', 'sans-serif'], // 본문 폰트 패밀리 설정
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Tailwind Forms 플러그인 추가 예시
  ],
};