/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          "custom-blue": "#0B192C",
          "custom-lightpink": "#9482DA",
          "custom-purple": "#231F35",
          "custom-button": "#004086",
          "custom-pink": "#EB3678",
        },
      },
      fontFamily: {
        PixelifySans: ["PixelifySans", "sans-serif"],
        ReadexPro: ["ReadexPro", "sans-serif"],
        ReadexProBold: ["ReadexPro-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
