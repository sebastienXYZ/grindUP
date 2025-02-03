/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#9333EA',
          dark: '#7E22CE',
          light: '#A855F7'
        },
        secondary: {
          DEFAULT: '#C084FC',
          dark: '#A855F7'
        },
        accent: '#8B5CF6'
      },
      animation: {
        blob: "blob 7s infinite",
        float: "float 6s ease-in-out infinite",
        parallax: "parallax 1s ease-out forwards",
        shine: "shine 3s linear infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        float: {
          "0%": {
            transform: "translateY(0px) scale(1)",
          },
          "50%": {
            transform: "translateY(-20px) scale(1.1)",
          },
          "100%": {
            transform: "translateY(0px) scale(1)",
          },
        },
        parallax: {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(var(--parallax-y, 0))",
          },
        },
        shine: {
          "0%": {
            backgroundPosition: "200% center",
          },
          "100%": {
            backgroundPosition: "-200% center",
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};