import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // синий
        light: '#f8fafc',   // светлый фон
      },
    },
  },
  plugins: [],
};

export default config;
