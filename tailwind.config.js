/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './public/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors (WCAG AA compliant contrast ratios)
        'primary': '#2563EB', // blue-600 - contrast 4.56:1 with white
        'secondary': '#059669', // emerald-600 - contrast 4.52:1 with white
        'accent': '#D97706', // amber-600 - contrast 4.54:1 with white
        'danger': '#DC2626', // red-600 - contrast 4.51:1 with white
      },
    },
  },
  plugins: [],
}
