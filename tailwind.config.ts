import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1400px" },
    },
    extend: {
      colors: {
        // Tokens semânticos (mapeados em CSS vars)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card:       { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        primary:    { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary:  { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted:      { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent:     { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        border: "hsl(var(--border))",
        input:  "hsl(var(--input))",
        ring:   "hsl(var(--ring))",
      },
      borderRadius: { lg: "0.75rem", xl: "1rem", "2xl": "1.25rem" },
      fontFamily: { sans: ["var(--font-inter)", "system-ui", "sans-serif"] },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "pop-in": { "0%": { transform: "scale(.9)", opacity: "0" }, "100%": { transform: "scale(1)", opacity: "1" } },
      },
      animation: {
        "accordion-down": "accordion-down .22s ease-out",
        "accordion-up":   "accordion-up .22s ease-out",
        "pop-in": "pop-in .18s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
