/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";

export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./src/styles/main.css",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: "#2D60FF",
        customLineColor: "#EBEEF2",
        customBackgroundColor: "#F6F8FA",
        customTextColor: "#718EBF",
        customFocusedTextColor: "#2D60FF",
      },
    },
  },
  plugins: [scrollbar],
};
