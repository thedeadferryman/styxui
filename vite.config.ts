import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tsconfigPaths from 'vite-tsconfig-paths';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(),
		tsconfigPaths(),
		visualizer({
			template: 'treemap',
			open: false,
			gzipSize: true,
			brotliSize: true,
			filename: 'dist/treemap.html',
		}),
	],
	build: {
		rollupOptions: {
			output: {
				manualChunks: id => {
					if (id.includes('node_modules')) {
						return 'vendor';
					}
					const match = id.match(/kit\/(.*)\.svelte/);
					if (match) {
						return `kit/${match[1]}`;
					}

					return 'core';
				},
				name: 'core',
				entryFileNames: '[name].js',
				chunkFileNames: '[name].js',
				assetFileNames: 'assets/[name].[ext]',
				generatedCode: {
					constBindings: true,
					objectShorthand: true,
				},
			},
		},
	},
});
