export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: "#0f0f0f", // Full black base
        primary: "#3B82F6", // Tailwind blue-500
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"], // Modern typeface
      },
    },
  },
  plugins: [],
};
