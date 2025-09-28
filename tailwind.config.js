/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mydark: {
          primary: "#f34700",
          "base-100": "#252527",
          "base-200": "#151517",
          "base-300": "#09090b",
        },
      },
      "light",
      "dark",
      "cupcake",
      "business",
    ],
  },
};
