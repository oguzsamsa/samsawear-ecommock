/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'display': ['Montserrat', 'sans-serif']
    },
    extend: {
      colors: {
        'primary-color': '#23A6F0',
        'text-color': '#252B42',
        'second-text-color': '#737373',
        'danger-text-color': '#E74040',
        'muted-color': '#BDBDBD',
        'success-text-color': '#2DC071'
      },
      aspectRatio: {
        '7/5': '7 / 5',
        '5/7': '5 / 7'
      }
    },
  },
  plugins: [],
}