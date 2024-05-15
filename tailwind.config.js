/** @type {import('tailwindcss').Config} */
export default {
	content: ['index.html', 'src/**/*.{ts,svelte}',], theme: {
		extend: {
			colors: {
				primary: '#6981D1', secondary: '#81D169',
			}, fontFamily: {
				display: 'Jetbrains Mono Variable, monospace',
			},
		},
	}, plugins: [],
};

