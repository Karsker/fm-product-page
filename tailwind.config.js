/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      animation: {
        fade: 'fade 0.5s ease'
      },

      keyframes: theme => ({
        fade: {
          '0%': { opacity: '0%' },
          '100%': {opacity: '100%'}
        }
      })
    },
  },
  plugins: [],
}

