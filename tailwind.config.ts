import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        command: {
          bg: "#0B0F19",
          surface: "#1A1F2E",
          "surface-hi": "#252B3D",
          border: "#2A3142",
          text: "#E5E7EB",
          "text-dim": "#9CA3AF",
          accent: "#7C3AED",
          "accent-hi": "#A78BFA",
        },
        studio: {
          bg: "#FBF9F6",
          surface: "#FFFFFF",
          "surface-alt": "#F5F1EA",
          border: "#EAE4DA",
          text: "#1F1B16",
          "text-dim": "#7A7269",
          accent: "#B8745A",
          "accent-hi": "#A6624A",
          "accent-soft": "#F0DDD3",
          botanic: "#2D5F4E",
        },
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'premium': '0 20px 25px -5px rgba(184, 116, 90, 0.05), 0 10px 10px -5px rgba(184, 116, 90, 0.02)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
};
export default config;
