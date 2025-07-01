// app/tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',   // all your React code
    './src/public/index.html',       // your static HTML template
  ],
  theme: {
    extend: {
      // e.g. add custom colors:
      // colors: {
      //   'brand-blue': '#1fb6ff',
      // },
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
}
