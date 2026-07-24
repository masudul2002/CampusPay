import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#6D28D9",
          secondary: "#8B5CF6",
          accent: "#A855F7",
          bg: "#09090B",
          card: "#18181B",
          border: "rgba(255, 255, 255, 0.08)",
          muted: "#A1A1AA",
          light: "#F4F4F5",
        },
      },
      fontFamily: {
        heading: ["var(--font-manrope)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        "3xl": "24px",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(109, 40, 217, 0.5)",
        "glow-accent": "0 0 40px -10px rgba(168, 85, 247, 0.5)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-glow": "radial-gradient(circle at 50% 0%, rgba(109, 40, 217, 0.25) 0%, rgba(9, 9, 11, 0) 70%)",
        "card-gradient": "linear-gradient(135deg, rgba(24, 24, 27, 0.8) 0%, rgba(18, 18, 20, 0.6) 100%)",
        "brand-gradient": "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 50%, #A855F7 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 12s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
