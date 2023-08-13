import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        custom: {
          red: '#F4333D',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      'dracula',
      {
        dark: {
          primary: '#793ef9',
          'primary-focus': '#570df8',
          'primary-content': '#ffffff',
          secondary: '#f000b8',
          'secondary-focus': '#bd0091',
          'secondary-content': '#ffffff',
          accent: '#37cdbe',
          'accent-focus': '#2aa79b',
          'accent-content': '#ffffff',
          neutral: '#2a2e37',
          'neutral-focus': '#16181d',
          'neutral-content': '#ffffff',
          'base-100': '#3b424e',
          'base-200': '#2a2e37',
          'base-300': '#16181d',
          'base-content': '#ebecf0',
          info: '#66c7ff',
          success: '#87cf3a',
          warning: '#e1d460',
          error: '#ff6f6b',
        },
      },
    ],
  },
};
export default config;
