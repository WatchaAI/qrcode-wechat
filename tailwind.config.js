/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#fafafa',
          card: '#ffffff',
          hover: '#f5f5f5',
        },
        border: {
          DEFAULT: '#e5e5e5',
          hover: '#d4d4d4',
        },
        text: {
          primary: '#0a0a0a',
          secondary: '#525252',
          muted: '#a3a3a3',
        },
      },
    },
  },
  plugins: [],
}

