/** @type {import('tailwindcss').Config} */
// tailwind.config.js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['yg-jalnan', 'sans-serif'], // 타이틀 폰트 패밀리 설정
        body: ['Pretendard', 'sans-serif'], // 본문 폰트 패밀리 설정
      },
      colors: {
        primary: {
          400: '#F28302', 
          500: '#E67E22', 
          600: '#D35400', 
        },
        gray: {
          100: '#FFFDF5', 
          200: '#EEEDEC',
          300: '#A5A5A5',
          400: '#989898',
          600: '#333333',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Tailwind Forms 플러그인 추가 예시
  ],
};
