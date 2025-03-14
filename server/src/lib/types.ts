import type { Hono } from "hono"

import type { BASE_PATH } from "./constants"

export type AppEnv = {
	Variables: {
		user: string
	}
	Bindings: {
		AUTH_SECRET: string
	}
}

export type AppAPI = Hono<AppEnv, {}, typeof BASE_PATH>
