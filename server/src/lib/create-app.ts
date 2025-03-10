import { serveStatic } from "@hono/node-server/serve-static"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { showRoutes } from "hono/dev"
import { logger } from "hono/logger"
import { secureHeaders } from "hono/secure-headers"
import { readFile } from "node:fs/promises"

import type { AppAPI, AppEnv } from "./types"

import { CSP_RULES } from "../middlewares/csp"
import notFound from "../middlewares/not-found"
import { env } from "../t3-env"
import { BASE_PATH } from "./constants"

// import "./instruments.js"

const indexHtml = await readFile("public/index.html", "utf8")

export function createRouter() {
	const app = new Hono<AppEnv>({
		strict: false,
	})
	app.use("*", secureHeaders(CSP_RULES))
	app.use(
		"*",
		cors({
			origin: [env.ORIGIN_URL],
		}),
	)

	return app
}

export function createApp() {
	const app = createRouter()
		.use("*", serveStatic({ root: "public/" }))
		.use("/vite.svg", serveStatic({ root: "public/" }))

		.use("*", async (c, next) => {
			if (c.req.path.startsWith(BASE_PATH)) {
				return next()
			}
			return c.html(indexHtml)
		})
		.basePath(BASE_PATH) as AppAPI

	app.use(logger())
	app.notFound(notFound)
	showRoutes(app, {
		verbose: true,
	})

	return app
}
