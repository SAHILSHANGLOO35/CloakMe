/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                firma: ['"BR Firma"', "sans-serif"],
            },
            keyframes: {
                pop: {
                    "0%": { transform: "scale(1)" },
                    "50%": { transform: "scale(1.4)" },
                    "100%": { transform: "scale(1)" },
                },
                "pulse-glow": {
                    "0%, 100%": { boxShadow: "0 0 0 0 rgba(239, 68, 68, 0.6)" },
                    "50%": { boxShadow: "0 0 0 8px rgba(239, 68, 68, 0)" },
                },
            },
            animation: {
                pop: "pop 0.3s ease",
                "pulse-glow": "pulse-glow 1s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};
