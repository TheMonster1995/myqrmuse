/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#35485d',
        primaryLight: '#adbed0',
        secondary: '#FF9000',
        light: '#ecf0f1',
      }
    },
    minWidth: {
      '3/4': '75%',
      '1/4': '25%',
      '1/2': '50%',
      '1/3': '33%',
    },
    maxWidth: {
      '3/4': '75%',
      '1/4': '25%',
      '1/2': '50%',
      '1/3': '33%',
    },
  },
  plugins: [],
}
