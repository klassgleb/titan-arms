/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        titan: {
          ink: "#090a0d",
          panel: "#111318",
          orange: "#ff5a1f",
          blue: "#315cff",
        },
      },
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        sans: ["Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};
