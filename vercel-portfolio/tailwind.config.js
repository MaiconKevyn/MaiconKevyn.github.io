/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        smurf: {
          primary: '#00d7ff', // Bright Smurf blue
          secondary: '#88CCFF', // Lighter blue
          dark: '#0055aa', // Darker blue for contrast
          white: '#ffffff',
          accent: '#fbbf24', // Yellow for accent (like Smurfette's hair or hats?)
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
    },
  },
  plugins: [],
};
