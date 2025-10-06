import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./styles/**/*.{css}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'SF Pro Text', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Apple Color Emoji', 'Segoe UI Emoji']
      },
      colors: {
        ss: {
          bg1: "#0c0a14",
          bg2: "#170b2d",
          bg3: "#110622",
          gold: "#f5c542",
          orange: "#ff7a18",
          magenta: "#d63cff",
          lilac: "#b39ddb",
          white: "#ffffff"
        }
      },
      boxShadow: {
        soft: "0 12px 28px rgba(214,60,255,.22)"
      },
      borderRadius: {
        xl2: "1.25rem"
      }
    }
  },
  plugins: []
};
export default config;
