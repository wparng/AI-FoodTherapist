/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // This ensures Tailwind applies to all your components
  ],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
    },
    fontSize: {
      custom: "18px",
    },
    lineHeight: {
      custom: "21.78px",
    },
  },
  plugins: [],
};
