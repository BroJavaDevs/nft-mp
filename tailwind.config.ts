import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      225: "225px",
      310: "310px",
      340: "340px",
      350: "350px",
      370: "370px",
      400: "400px",
      420: "420px",
      450: "450px",
      500: "500px",
      550: "550px",
      600: "600px",
      630: "630px",
      660: "660px",
      720: "720px",
      800: "800px",
      840: "840px",
      860: "860px",
      900: "900px",
      950: "950px",
      1000: "1000px",
      1140: "1140px",
      1250: "1250px",
      1260: "1260px",
      1280: "1280px",
      1300: "1300px",
    },
  },
  plugins: [],
};
export default config;
