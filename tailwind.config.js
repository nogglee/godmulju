/** @type {import('tailwindcss').Config} */
// tailwind.config.js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      // 추가적인 테마 설정
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Tailwind Forms 플러그인 추가 예시
  ],
};