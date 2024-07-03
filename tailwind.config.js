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
        'diablo-dark': '#613e16',
        'diablo-bg': '#1a130e',
        'diablo-yellow': '#fef08a',
        discord: '#5865F2'
      },
      fontFamily: {
        exo: ['ExocetOTCECY-Medium']
      }
    }
  },
  plugins: []
}
