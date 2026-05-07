/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#080808',
        surface: '#111111',
        's2': '#1a1a1a',
        gold: '#c8900a',
        'gold-light': '#f5c842',
        green: '#2d8a4e',
        'green-light': '#4caf70',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
