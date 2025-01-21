import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      
      fontFamily: {
        anton: ['Anton'],
        oswald:['Oswald'],
        open_sans:['Open_Sans']
      },

      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        dark_blue: "#0071d0",
        normal_blue: "#008dd9",
        light_blue: "#00a4d0",
        marine: "#00b8bd",
        light_marine: "#37c9a8",
      },
      width: {
        '1920px': '1920px', // Dodaje klasę w-400px
      },
      height: {
        '1080px': '1080px', // Dodaje klasę h-600px
      },
    },
  },
  plugins: [],
} satisfies Config;
