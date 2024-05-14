/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navanc: {
          bgAuth: "#280161",
          primary: "#9e5bff",
          secondary: "#8635f9",
          textPrimary: "#0f1d67",
          textSecondary: "#6c7280",
          textTertiary: "#6b7280",
          deepPurple: "#2f0073",
          darkpurple: "#1a003e",
        },
      },
    },
  },
  plugins: [],
};
