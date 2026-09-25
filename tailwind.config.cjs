module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        saffron: '#FF7043',
        maroon: '#7C0A02',
        gold: '#E0A800',
        cream: '#FFF7ED'
      },
      fontFamily: {
        display: ['Georgia', 'serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
}
