/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg_light: "#E9EBEE",
        bg_dark: "#211F37",
        navbar_light: "#EFECFD",
        navbar_dark: "#2B2744",
        accent_light: "#938ef5",
        accent_dark: "#7C5CFF",
      },
    },
  },
  plugins: [],
};
