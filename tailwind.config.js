/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        'neon-cyan': '#00ffff',
        'neon-magenta': '#ff00ff',
        'cyber-black': '#000000',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 20px #00ffff',
        'neon-magenta': '0 0 20px #ff00ff',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%': { boxShadow: '0 0 20px #00ffff' },
          '100%': { boxShadow: '0 0 40px #00ffff, 0 0 60px #00ffff' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}