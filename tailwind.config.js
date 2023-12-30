/** @type {import('tailwindcss').Config} */

import formsPlugin from "@tailwindcss/forms"
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: ["class"],
	theme: {
		extend: {
			fontFamily: {
				ubuntu: ["Ubuntu", "sans-serif"],
			},
		},
	},
	plugins: [formsPlugin],
}
