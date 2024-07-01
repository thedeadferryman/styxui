import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import tsconfigPaths from 'vite-tsconfig-paths';
import { replaceCodePlugin } from 'vite-plugin-replace';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return ({
		plugins: [
			react(),
			tsconfigPaths(),
			visualizer({
				template: 'treemap',
				open: false,
				gzipSize: true,
				brotliSize: true,
				filename: 'dist/treemap.html',
			}),
			replaceCodePlugin({
				replacements: [
					{
						from: 'STYXUI_SAFE_EVAL',
						to: env['STYXUI_ENABLE_EVAL'] ? 'eval' : 'void',
					},
				],
			}),
		],
		build: {
			rollupOptions: {
				output: {
					manualChunks: id => {
						if (id.includes('node_modules')) {
							return 'vendor';
						}

						const match = id.match(/kit\/(.*)\/.*\.tsx/);
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
});
