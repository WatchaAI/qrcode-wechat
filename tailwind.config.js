/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0a0a0a',
          card: '#141414',
          hover: '#1a1a1a',
        },
        border: {
          DEFAULT: '#222222',
          hover: '#333333',
        },
        text: {
          primary: '#ffffff',
          secondary: '#999999',
          muted: '#666666',
        },
      },
    },
  },
  plugins: [],
}

