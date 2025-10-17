/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        abeezee: ['Abeezee', 'sans-serif'],
        imperial: ['Imperial Script', 'cursive'],
        arima: ['Arima', 'sans-serif'],
      },
      colors: {
        customMaroon: '#b35780'
      }
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
      
        '.btn-bookNow': {
          padding: '12px 48px',
          fontSize: '1rem',
          fontFamily: 'abeezee',
          fontWeight: '0',
          color: 'white',
          border: '2px solid #7393B3',
          borderRadius: '9999px',
          backgroundColor: '#7393B3',
          overflow: 'hidden',
          cursor: 'pointer',
        },
        '.btn-bookNow:hover': {
          color: '#7393B3',
          transform: 'scale(1.1)',
          boxShadow: '0 0px 20px rgba(193, 163, 98, 0.4)',
        },
        '.btn-bookNow::before': {
          content: '""',
          position: 'absolute',
          inset: '0',
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          backgroundColor: 'white',
          transform: 'scale(0)',
          zIndex: '-1',
        },
        '.btn-bookNow:hover::before': {
          transform: 'scale(3)',
        },
        '.btn-bookNow:active': {
          transform: 'scale(1)',
        },


        '.btn-bookNowCenter': {
          padding: '12px 48px',
          fontSize: '1rem',
          fontFamily: 'abeezee',
          fontWeight: '0',
          color: '#7393B3',
          border: '2px solid #7393B3',
          borderRadius: '9999px',
          backgroundColor: 'white',
          overflow: 'hidden',
          cursor: 'pointer',
        },
        '.btn-bookNowCenter:hover': {
          color: 'white',
          transform: 'scale(1.1)',
          boxShadow: '0 0px 20px rgba(193, 163, 98, 0.4)',
        },
        '.btn-bookNowCenter::before': {
          content: '""',
          position: 'absolute',
          inset: '0',
          width: '100%',
          height: '100%',
          borderRadius: 'inherit',
          backgroundColor: '#7393B3',
          transform: 'scale(0)',
          zIndex: '-1',
        },
        '.btn-bookNowCenter:hover::before': {
          transform: 'scale(3)',
        },
        '.btn-bookNowCenter:active': {
          transform: 'scale(1)',
        },
      });
    },
    
  ],
}



