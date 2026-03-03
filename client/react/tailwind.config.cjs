/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "strat-bg": "#0a0b10",
        "strat-card": "#10151f",
        "strat-panel": "#0e1118",
      },
      backgroundImage: {
        "gradient-accent":
          "linear-gradient(135deg, rgba(124,58,237,1), rgba(59,130,246,1), rgba(34,211,238,1))",
        "radial-faded":
          "radial-gradient(circle at 20% 20%, rgba(124,58,237,0.16), transparent 45%), radial-gradient(circle at 80% 10%, rgba(59,130,246,0.16), transparent 45%), radial-gradient(circle at 70% 80%, rgba(34,211,238,0.16), transparent 50%)",
        "panel-glow":
          "radial-gradient(circle at 20% 0%, rgba(124,58,237,0.18), transparent 55%), radial-gradient(circle at 80% 100%, rgba(34,211,238,0.16), transparent 55%)",
      },
      boxShadow: {
        "glow-cyan": "0 0 24px rgba(34,211,238,0.25)",
        "glow-purple": "0 0 28px rgba(124,58,237,0.22)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
