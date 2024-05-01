/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg_light: "#EDEDED",
        bg_dark: "#242526",
        navbar_light: "#DEDEDE",
        navbar_dark: "#18191A",
        accent_light: "#6BCEF2",
        accent_dark: "#6BCEF2",
      },
    },
  },
  plugins: [],
};
