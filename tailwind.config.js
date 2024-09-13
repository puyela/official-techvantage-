/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',   // var(--color-primary)
        primary2: '#2563EB33', // var(--color-primary2)
        white: '#ffffff', // var(--color-white)
        red: 'rgb(255, 63, 63)', // var(--color-red)
        'gray-100': 'hsl(220, 20%, 10%, 5%)', // var(--color-gray-100)
        'gray-200': 'hsl(220, 20%, 10%, 5%)', // var(--color-gray-200)
        'gray-300': 'hsl(220, 20%, 10%, 5%)', // var(--color-gray-300)
        'gray-500': 'hsl(220, 20%, 10%, 5%)', // var(--color-gray-500)
        'gray-700': '#252542', // var(--color-gray-700)
        'gray-900': '#0c0c22', // var(--color-gray-900)
        bg: '#f2f2f3', // var(--color-bg)
      },
      borderRadius: {
        '4': '8px', // var(--radius-4)
        '3': '6px', // var(--radius-3)
        '2': '4px', // var(--radius-2)
      },
      transitionProperty: {
        DEFAULT: 'all 0.3s ease', // var(--transition)
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '92%', // var(--container-width-md)
          lg: '100%', // var(--container-width-lg)
        },
      },
      fontSize: {
        '2xl': '2.2rem', // h1
        xl: '1.9rem', // h2
        lg: '1.4rem', // h5
        md: '1.3rem', // h3
        sm: '1.1rem', // h4
        xs: '0.9rem', // Default font-size
      },
    },
  },
  plugins: [],
};
