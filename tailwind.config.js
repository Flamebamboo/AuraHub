/** @type {import('tailwindcss').Config} */
import nativewindPreset from 'nativewind/preset';

export default {
  content: ['./src/app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  presets: [nativewindPreset],
  theme: {
    extend: {
      colors: {
        onboarding: {
          black: '#16141C',
        },
        primary: {
          'custom-black': '#141414',
          'custom-blue': '#0B192C',
          'custom-lightpink': '#9482DA',
          'custom-purple': '#231F35',
          'custom-button': '#004086',
          'custom-pink': '#EB3678',
        },
        secondary: {
          'custom-black': '#2C2C2C',
          'custom-gray': '#454545',
        },
      },
      fontFamily: {
        PixelifySans: ['PixelifySans'],
        PixelCode: ['PixelCode'],
      },
    },
  },
  plugins: [],
};
