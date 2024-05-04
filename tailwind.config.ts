import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1440px',
    },
    extend: {
      transitionDuration: {
        DEFAULT: '300ms',
      },
      transitionTimingFunction: {
        DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        DEFAULT: '0px 2px 5px 0px rgba(0, 0, 0, 0.15)',
      },
      colors: {
        main: '#565656',
        accent: '#FBCD21',
        mainBg: '#0065B2;',
        headerBg: 'rgba(68, 127, 172, 0.82)',
        footerBg: '#0E2B42',
        chocolate: '#442103',
        dateBg: 'rgba(205, 220, 231, 0.82)',
      },
    },
  },
  plugins: [],
};
export default config;
