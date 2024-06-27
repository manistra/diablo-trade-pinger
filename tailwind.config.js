//

/** u/type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/renderer/index.html',
    './src/renderer/src/**/*.{svelte,js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-select/dist/index.esm.js'
  ],
  theme: {
    extend: {
      colors: {
        diablo: '#f28303',
        'diablo-dark': '#613e16'
      },
      fontFamily: {
        exo: ['ExocetOTCECY-Medium']
      }
    }
  },
  plugins: []
}
