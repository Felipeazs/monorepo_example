import { Hono } from "hono"

import type { AppAPI, AppEnv } from "../lib/types"

import { BASE_PATH } from "../lib/constants"
import authMe from "./auth"
import login from "./login"
import logout from "./logout"
import producto_route from "./producto"
import refresh from "./refresh"
import signup from "./signup"
import usuario_route from "./usuario"

export function registerRoutes(app: AppAPI) {
	return app
		.get("/health", (c) => {
			c.status(200)
			return c.text("API live and running...")
		})
		.get("/error", (c) => {
			return c.json({ message: "error route" })
		})
		.route("/login", login)
		.route("/signup", signup)
		.route("/logout", logout)
		.route("/auth", authMe)
		.route("/refresh", refresh)
		.route("/usuario", usuario_route)
		.route("/producto", producto_route)
}

// to use in client api
export const router = registerRoutes(
	new Hono<AppEnv>({
		strict: false,
	}).basePath(BASE_PATH),
)

export type AppRouter = typeof router
