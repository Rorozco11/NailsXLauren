/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
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
          padding: '12px 24px',
          fontSize: '1rem',
          fontFamily: 'abeezee',
          fontWeight: '0',
          color: 'white',
          border: '2px solid #A5B4FC',
          borderRadius: '9999px', // Full rounding
          backgroundColor: '#A5B4FC',
          overflow: 'hidden',
          cursor: 'pointer',
        },
        '.btn-bookNow:hover': {
          color: ' #A5B4FC',
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
          padding: '12px 24px',
          fontSize: '1rem',
          fontFamily: 'abeezee',
          fontWeight: '0',
          color: '#A5B4FC',
          border: '2px solid #A5B4FC',
          borderRadius: '9999px', // Full rounding
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
          backgroundColor: '#A5B4FC',
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



