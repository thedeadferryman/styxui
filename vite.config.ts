/*
 * Copyright 2024 Karl F. Meinkopf
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

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
