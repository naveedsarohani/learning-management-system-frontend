/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      clipPath: {
        slash: "polygon(0 0, 70% 0, 100% 100%, 0 100%)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
