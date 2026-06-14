/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: '#10152d',
        surface2: '#141b32',
        surface3: '#1f2850',
        border: 'rgba(255,255,255,0.08)',
        primary: '#6c8dfa',
        primarySoft: '#7b8cff',
        accent: '#f97c5d',
        muted: '#9aa5c4',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(0,0,0,0.23)',
      },
      backgroundImage: {
        hero: 'radial-gradient(circle at top left, rgba(108,141,250,0.16), transparent 28%), radial-gradient(circle at bottom right, rgba(255,255,255,0.06), transparent 18%)',
      },
    },
  },
  plugins: [],
}
