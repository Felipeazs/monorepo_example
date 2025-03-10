import tailwindcss from "@tailwindcss/vite"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react-swc"
import path from "node:path"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
	build: {
		outDir: "../server/public",
		emptyOutDir: true,
		minify: "esbuild",
		rollupOptions: {
			output: {
				manualChunks: {
					"lucide-react": ["lucide-react"],
					posthog: ["posthog-js"],
					zod: ["zod"],
				},
			},
		},
	},
	plugins: [
		tsconfigPaths(),
		TanStackRouterVite({
			target: "react",
			autoCodeSplitting: true,
			// routeFilePrefix: "~",
			// routeTreeFileHeader: ["/* eslint-disable eslint-comments/no-unlimited-disable */", "/* eslint-disable */"],
			generatedRouteTree: "./src/route-tree.gen.ts",
		}),
		react(),
		tailwindcss(),
	],
	resolve: {
		alias: {
			"@/client/*": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		proxy: {
			"/server": "http://localhost:3000",
		},
	},
})
