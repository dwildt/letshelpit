/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors
        'primary': '#3B82F6',
        'secondary': '#10B981',
        'accent': '#F59E0B',
        'danger': '#EF4444',
      },
    },
  },
  plugins: [],
}
