/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(0, 0%, 100%)", // White background
        border: "hsl(214, 32%, 91%)", // Default shadcn border color
        foreground: "hsl(222.2, 47.4%, 11.2%)", // Dark foreground
        card: "hsl(0, 0%, 100%)",
        primary: "hsl(221, 83%, 53%)", // Blue Primary Color
      },
    },
  },
  plugins: [],
};
