import plugin from "tailwindcss/plugin";

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        fantasy: ["Arial", "sans-serif"], // Correct way to define a font
      },
      zIndex: {
        0: 0,
        10: 10,
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        body: {
          backgroundColor: "black",
          fontFamily: theme("fontFamily.fantasy"), // Correct way to apply font
        },
      });
    }),
  ],
};
