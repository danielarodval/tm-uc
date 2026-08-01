/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './privacy.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          gold: '#F59E0B',
          amber: '#D97706',
          dark: '#0B0F17',
          card: '#131B2A',
          border: '#1E293B',
          blue: '#0EA5E9',
          slate: '#64748B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
