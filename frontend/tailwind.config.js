/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          primary: '#0f172a',
          deeper: '#020617',
          card: '#1e293b',
          border: 'rgba(255, 255, 255, 0.05)',
        },
        accent: {
          primary: '#6366f1',
          'primary-dark': '#4f46e5',
          'primary-light': '#818cf8',
          secondary: '#0ea5e9',
          amber: '#f59e0b',
          success: '#10b981',
          danger: '#ef4444',
        },
      },
      animation: {
        'float': 'float 20s ease-in-out infinite',
        'pulse-slow': 'pulse-glow 4s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-up': 'slideUp 0.3s ease forwards',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '25%': { transform: 'translate(30px, -30px) rotate(5deg)' },
          '50%': { transform: 'translate(-20px, 20px) rotate(-5deg)' },
          '75%': { transform: 'translate(20px, 30px) rotate(3deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99, 102, 241, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.4)' },
        },
      },
    },
  },
  plugins: [],
}
