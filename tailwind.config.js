
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        card: 'var(--color-card)',
        'card-foreground': 'var(--color-card-foreground)',
        border: 'var(--color-border)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
        'holy-white': 'var(--color-holy-white)',
      },
      boxShadow: {
        'glow': '0 0 15px 3px var(--color-primary), 0 0 5px 1px var(--color-primary)',
        'inner-sm': 'inset 0 1px 2px 0 rgb(255 255 255 / 0.05)',
      },
       animation: {
        'aurora-bg': 'aurora-bg 20s ease infinite',
        'shine': 'shine 1.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
      keyframes: {
        'aurora-bg': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'shine': {
          'from': { transform: 'translateX(-100%) skewX(-15deg)' },
          'to': { transform: 'translateX(200%) skewX(-15deg)' },
        },
      },
    },
  },
  plugins: [],
}