/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { colors: {
      primary: "#CE9DF9",
      azul: "#0B1455",
      anaranjado: "#E26105",
      negro: "#151419",
      anaranjado_claro: "#FFC107",
      amarillo: "#FFEB3B",
      blanco: "#FBFBFB"
    },
    fontFamily: {
    vazirmatn: ["var(--font-vazir)", "Vazirmatn", "serif"],
    lato: ["var(--font-lato)", "Lato","serif"], 
    },
    fontSize: {
      h1: ["3rem", { lineHeight: "1.3" }],
      h2: ["2.5rem", { lineHeight: "1.2" }],
      h3: ["2rem", { lineHeight: "1.2" }],
      h4: ["1.5rem", { lineHeight: "1.2" }],
      h5: ["1.25rem", { lineHeight: "1" }],
      bodyMd: ["1rem", { lineHeight: "1" }],
      bodySm: ["0.875rem", { lineHeight: "0.9" }],
      quote: ["0.625rem", { lineHeight: "0.8" }],
    },},
  },
  plugins: [],
}