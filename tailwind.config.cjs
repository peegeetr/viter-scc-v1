/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0b6351",
        // secondary: "#002c59",
        // primary: "#00338f",
        secondary: "#738ec3",
        alert: "#b91c1c",
        warning: "#ff7d54",
        archive: "#d4c3af	",
        dark: "#3a3b36",
      },
      fontSize: {
        huge: "clamp(2.4rem, 6vw, 5rem)",
      },
      height: {
        responsive: "clamp(5rem,17vw,22rem)",
      },
      screens: {
        xs: "420px",
      },

      keyframes: {
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(2px)" },
          "50%": { transform: "translateX(-2px)" },
          "75%": { transform: "translateX(2px)" },
          "100%": { transform: "translateX(0)" },
        },
        grow: {
          "0%, 100%": { transform: "scaleY(1)" },
          "50%": { transform: "scaleY(1.8)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },

        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },

        slideUp: {
          "0%": { transform: "translateY(10px)" },
          "100%": { transform: "translateY(0px)" },
        },

        slideDown: {
          "0%": { transform: "translateY(0px)" },
          "100%": { transform: "translateY(10px)" },
        },
      },

      animation: {
        shake: "shake .2s ease-in-out",
        slideUp: "slideUp .2s ease-in-out",
        slideDown: "slideDown .2s ease-in-out",
        fadeIn: "fadeIn .2s ease-in-out",
        fadeOut: "fadeOut .2s ease-in-out",
        grow1: "grow 1s ease-in-out infinite",
        grow2: "grow 1s ease-in-out 0.15s infinite",
        grow3: "grow 1s ease-in-out 0.3s infinite",
        grow4: "grow 1s ease-in-out 0.475s infinite",
      },
    },
  },
  plugins: [],
};
