/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Tailwind가 적용될 파일들
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ['"Your Title Font"', 'sans-serif'], // 커스텀 폰트 패밀리
        body: ['"Your Body Font"', 'serif'],
      },
      fontSize: {
        'title-lg': ['32px', '40px'], // 커스텀 폰트 크기
        'title-md': ['24px', '32px'],
        'body-lg': ['18px', '28px'],
        'body-md': ['16px', '24px'],
      },
      colors: {
        primary: '#FF7F00', // 기본 색상
        secondary: '#153069', // 보조 색상
      },
    },
  },
  plugins: [],
};
