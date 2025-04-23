/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        star: {
          '0%': { opacity: '0', transform: 'scale(0) rotate(-180deg)' },
          '100%': { opacity: '1', transform: 'scale(1) rotate(0deg)' },
        },
      },  
      animation: {
        star: 'star 0.3s ease-out forwards',
        'star-delay': 'star 0.3s ease-out forwards 1s',
      },
    },
  },
  plugins: [],
}