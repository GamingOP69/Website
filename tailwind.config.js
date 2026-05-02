/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff3b3b',
        bg: '#0b0f14',
        panel: 'rgba(255,255,255,0.04)',
        accent: '#ff6b6b'
      },
      fontFamily: {
        heading: ['Inter', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        glow: '0 4px 30px rgba(255,59,59,0.12)'
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}

