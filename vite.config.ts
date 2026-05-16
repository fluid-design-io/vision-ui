import tailwindcss from '@tailwindcss/vite'
import babel from '@rolldown/plugin-babel'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import mdx from 'fumadocs-mdx/vite'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		mdx(await import('./source.config')),
		tailwindcss(),
		tanstackStart({
			prerender: {
				enabled: true,
			},
		}),
		react(),
		babel({
			presets: [reactCompilerPreset()],
		}),
		// please see https://tanstack.com/start/latest/docs/framework/react/guide/hosting#nitro for guides on hosting
		nitro({
			preset: 'vercel',
			traceDeps: ['tslib*'],
		}),
	],
	resolve: {
		tsconfigPaths: true,
		alias: {
			tslib: 'tslib/tslib.es6.js',
		},
	},
})
