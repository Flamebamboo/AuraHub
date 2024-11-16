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
          "custom-pink": "#9482DA",
          "custom-button": "#004086",
        },
      },
      fontFamily: {
        PixelifySans: ["PixelifySans", "sans-serif"],
        ReadexPro: ["ReadexPro", "sans-serif"],
        ReadexProBold: ["ReadexPro-Bold", "sans-serif"],
        BalooBhaijaan2Bold: ["BalooBhaijaan2-Bold", "sans-serif"],
      },
    },
  },
  plugins: [],
};
