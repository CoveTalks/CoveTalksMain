import type { Config } from 'tailwindcss'

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // CoveTalks Brand Colors
        sand: "#f3b338",
        calm: "#1d93b7",
        deep: "#155487",
        "deep-dark": "#1e3d6f",
        foam: "#f8f9fa",
        
        // Semantic colors mapping
        primary: {
          DEFAULT: "#155487", // deep
          dark: "#1e3d6f",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#1d93b7", // calm
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#f3b338", // sand
          foreground: "#000000",
        },
        
        // Neutral colors
        background: "#f8f9fa",
        foreground: "#2c3e50",
        card: {
          DEFAULT: "#ffffff",
          foreground: "#2c3e50",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#2c3e50",
        },
        muted: {
          DEFAULT: "#f0f0f0",
          foreground: "#666666",
        },
        destructive: {
          DEFAULT: "#dc3545",
          foreground: "#ffffff",
        },
        border: "#e1e8ed",
        input: "#e1e8ed",
        ring: "#155487",
      },
      fontFamily: {
        sans: ["Brandon Text", "Segoe UI", "system-ui", "sans-serif"],
        heading: ["Brandon Text", "Segoe UI", "system-ui", "sans-serif"],
      },
      fontSize: {
        "hero": ["3.5rem", { lineHeight: "1.1", fontWeight: "900" }],
        "display": ["2.5rem", { lineHeight: "1.2", fontWeight: "700" }],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'medium': '0 5px 25px rgba(0, 0, 0, 0.1)',
        'hard': '0 10px 40px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [require("tailwindcss-animate"), 
            require('@tailwindcss/typography')
  ],
} satisfies Config

export default config
