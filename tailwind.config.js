/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				"branding-success": "#00b207",
				"branding-success-bright": "#84d187",
				"branding-success-dark": "#2c742f",
				"branding-warning": "#ff8a00",
				"branding-error": "#ea4b48",
				"gray-scale-gray-50": "#f2f2f2",
				"gray-scale-gray-100": "#e6e6e6",
				"gray-scale-gray-300": "#b3b3b3",
				"gray-scale-gray-400": "#999",
				"gray-scale-gray-500": "#808080",
				"gray-scale-gray-600": "#666",
				"gray-scale-gray-700": "#4d4d4d",
				"gray-scale-gray-800": "#333",
				"gray-scale-gray-900": "#1a1a1a",
				"grey-card": "rgba(86, 172, 89, 0.1)"
			},
			fill: {
				"gray": "#666"
			},
			fontSize: {
				"xss": "0.625rem"
			},
			borderRadius: {
				"56": "3.5rem"
			},
			translate: {
				"translate-y-min50": " translateY(-50%)"
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
			},
			boxShadow: {
				"info": "0 8px 40px 0 rgba(0, 38, 3, 0.08)",
				"hover-item-categories": " 0 0 12px 0 rgba(32, 181, 38, 0.32)"
			}
		},
	},
	plugins: [],
}