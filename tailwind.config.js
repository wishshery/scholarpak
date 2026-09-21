/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#365b72',
          700: '#102c40',
          800: '#17394f',
          900: '#102c40',
        },
        gold: {
          400: '#dbc693',
          500: '#936f2c',
          600: '#795a24',
        },
        success: '#10b981',
        warning: '#936f2c',
        danger: '#ef4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #102c40 0%, #102c40 50%, #365b72 100%)',
        'card-gradient': 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(30,58,138,0.07), 0 2px 4px -1px rgba(30,58,138,0.05)',
        'card-hover': '0 20px 25px -5px rgba(30,58,138,0.12), 0 10px 10px -5px rgba(30,58,138,0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
};
