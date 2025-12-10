import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base
        'matte-black': '#0a0a0b',
        'deep-navy': '#0d1117',
        'navy-light': '#161b22',

        // Structure
        'gunmetal': '#21262d',
        'iron-gray': '#30363d',

        // Accents
        'brass': '#c9a227',
        'brass-light': '#d4b13d',
        'brass-muted': '#a38520',

        // Text
        'off-white': '#e6edf3',
        'slate': '#8b949e',

        // Semantic
        'background': 'var(--background)',
        'foreground': 'var(--foreground)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brass': '0 0 20px rgba(201, 162, 39, 0.15)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'circuit-grid': `
          linear-gradient(to right, rgba(33, 38, 45, 0.3) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(33, 38, 45, 0.3) 1px, transparent 1px)
        `,
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-up': 'slideUp 0.5s ease forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
