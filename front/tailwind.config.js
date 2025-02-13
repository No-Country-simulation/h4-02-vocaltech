/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens:{
        'mm':'880px',
      },
      colors: {
        primary: "#CE9DF9",
        azul: "#000115",
        azul_claro: "#172AB3",
        azul_card: "#003741",
        azul_oscuro: "#0A124D",
        anaranjado: "#E26105",
        negro: "#151419",
        anaranjado_claro: "#FFC107",
        anaranjado_secundario_300: "#EC9558",
        amarillo: "#FFEB3B",
        amarillo_secundario_300: "#FFD559",
        azul_secundario_300: "#5C628D",
        blanco_300: "#FCFCFC",
        blanco_600: "#E4E4E4",
        primary_50: "#E7E8EE",
        primary_300: "#5C628D",
        primary_400: "#3C4377",
        secondary_600: "#CE5805",
        negro_600: "#131217"
      },
      fontFamily: {
        vazirmatn: ["var(--font-vazir)", "Vazirmatn", "serif"],
        lato: ["var(--font-lato)", "Lato", "serif"],
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
      },
      objectPosition: {
        'center-top': 'center',
        'custom-50-25': '50% 50%',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              fontSize: theme("fontSize.h1")[0],
              lineHeight: theme("fontSize.h1")[1].lineHeight,
              fontWeight: "bold",
              fontFamily: theme("fontFamily.lato").join(","),
            },
            h2: {
              fontSize: theme("fontSize.h2")[0],
              lineHeight: theme("fontSize.h2")[1].lineHeight,
              fontWeight: "bold",
              fontFamily: theme("fontFamily.lato").join(","),
            },
            h3: {
              fontSize: theme("fontSize.h3")[0],
              lineHeight: theme("fontSize.h3")[1].lineHeight,
              fontWeight: "bold",
              fontFamily: theme("fontFamily.vazirmatn").join(","),
            },
            h4: {
              fontSize: theme("fontSize.h4")[0],
              lineHeight: theme("fontSize.h4")[1].lineHeight,
              fontWeight: "bold",
              fontFamily: theme("fontFamily.vazirmatn").join(","),
            },
            h5: {
              fontSize: theme("fontSize.h5")[0],
              lineHeight: theme("fontSize.h5")[1].lineHeight,
              fontWeight: "bold",
              fontFamily: theme("fontFamily.lato").join(","),
            },
          },
        },
      }),
    }
  },
  plugins: [require("@tailwindcss/typography")],
};
