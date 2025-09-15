/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          primary: '#005975',    // Deep teal
          secondary: '#B01469',  // Magenta/Pink
          accent: '#DAFE00',     // Bright lime
          neutral: '#9CC9D5',    // Light blue-gray
        },
        // Alias common color names to brand colors for easier use
        teal: {
          600: '#005975',
          700: '#004a5e',
          800: '#003d4d',
        },
        pink: {
          600: '#B01469',
          700: '#8f1053',
          800: '#730d43',
        },
        lime: {
          400: '#DAFE00',
          500: '#c4e600',
          600: '#a8cc00',
        },
        slate: {
          300: '#9CC9D5',
          400: '#7db8c7',
          500: '#5ea7b9',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

