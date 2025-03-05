import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import tsconfigPaths from "vite-tsconfig-paths"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"

// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: "../server/public",
        emptyOutDir: true,
    },
    plugins: [
        tsconfigPaths(),
        TanStackRouterVite({
            target: "react",
            autoCodeSplitting: true,
            // routeFilePrefix: "~",
            // routeTreeFileHeader: ["/* eslint-disable eslint-comments/no-unlimited-disable */", "/* eslint-disable */"],
            // generatedRouteTree: "./src/routeTree.gen.ts",
        }),
        react(),
    ],
    server: {
        proxy: {
            "/server": "http://localhost:3000",
        },
    },
})
