/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "kanit": ['Kanit', "sans-serif"],
        "linefont": ['Linefont', "sans-serif"]
      },
      colors: {
        "main-1": "#E63946",
        "main-2": "#1D3557"
      }
    },
  },
  plugins: [],
}