import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {
      grayscale: ['hover'],
    },
  },
} satisfies Config

