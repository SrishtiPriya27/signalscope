/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b', // zinc-950
        card: '#18181b', // zinc-900
        border: '#27272a', // zinc-800
        primary: '#3b82f6', // blue-500
        secondary: '#a1a1aa', // zinc-400
        accent: '#22d3ee', // cyan-400
        danger: '#ef4444', // red-500
        success: '#22c55e', // green-500
        warning: '#eab308', // yellow-500
      },
      fontFamily: {
        mono: ['Fira Code', 'Roboto Mono', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
