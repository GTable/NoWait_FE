/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      // User 앱 전용 브레이크포인트
      screens: {
        xs: "475px", // 모바일 세로
        sm: "640px", // 모바일 가로
        md: "768px", // 태블릿
        lg: "1024px", // 데스크톱
        xl: "1280px", // 큰 데스크톱
        "2xl": "1536px", // 아주 큰 화면
      },

      // User 앱 전용 Spacing (패딩, 마진)
      spacing: {
        // 작은 간격 (모바일 친화적)
        18: "4.5rem", // 72px
        22: "5.5rem", // 88px
        26: "6.5rem", // 104px
        30: "7.5rem", // 120px
        34: "8.5rem", // 136px
        38: "9.5rem", // 152px

        // User 앱 특화 간격
        "card-gap": "1.5rem", // 카드 간 간격
        "section-gap": "3rem", // 섹션 간 간격
        "container-padding": "1rem", // 컨테이너 패딩
      },

      // User 앱 전용 최대 너비
      maxWidth: {
        "user-container": "1200px",
        "user-card": "400px",
        "user-content": "800px",
      },

      // User 앱 전용 그리드
      gridTemplateColumns: {
        "user-cards": "repeat(auto-fit, minmax(300px, 1fr))",
        "user-layout": "1fr 300px",
      },
    },
  },

  presets: [require("@repo/tailwind-config/tailwind.config.js")],
};
