const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        heads:"#D6883C",
        heads1:"#C57844"
      },
    },
  },
  plugins: [flowbite.plugin()],
};
