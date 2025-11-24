/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          forest: '#1a4d2e',
          gold: '#d4af37',
          cream: '#f9f9f7',
          sand: '#f0efe9',
          charcoal: '#2c3e50',
          border: '#e2e8f0',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Libre Baskerville', 'serif'],
      },
      boxShadow: {
        'elegant': '0 10px 40px -10px rgba(26, 77, 46, 0.1)',
        'sharp': '5px 5px 0px 0px rgba(212, 175, 55, 0.3)',
      }
    },
  },
  plugins: [],
}