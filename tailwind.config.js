/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    screens:{
      
      'xl':{'max':'1200px'},
      'lg':{'max':'991px'},
      'md':{'max':'767px'},
      'sm':{'max':'550px'},
      'xsm':{'max':'375px'}, 
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
