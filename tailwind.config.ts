import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { gray, blue, ...rest } = colors;

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ...rest,
      gray: {
        100: "#DADADA",
        200: "#FAF8F5",
        300: "#F6F2EC",
        500: "#898989",
        900: "#181818",
      },
      blue: {
        500: "#4845FE",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-tektur)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
