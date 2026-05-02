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
        accent: '#ff6b6b',
        bg: '#0b0f14',
        'bg-dark': '#050809',
        'glass-light': 'rgba(255,255,255,0.05)',
        'glass-darker': 'rgba(0,0,0,0.3)'
      },
      fontFamily: {
        heading: ['Inter', 'ui-sans-serif', 'system-ui'],
        body: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        glow: '0 4px 30px rgba(255,59,59,0.2)',
        'glow-lg': '0 8px 50px rgba(255,59,59,0.3)',
        inner: 'inset 0 1px 3px 0 rgba(0,0,0,0.3)'
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gaming': 'linear-gradient(135deg, #0b0f14 0%, #1a1f2e 100%)'
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px'
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}

