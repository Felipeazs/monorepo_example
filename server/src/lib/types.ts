import type { Hono } from "hono"

import type { BASE_PATH } from "./constants"

export type EnvUsuario = {
	id: string
	email: string
}

export type AppEnv = {
	Variables: {
		usuario: EnvUsuario
	}
	Bindings: {
		AUTH_SECRET: string
	}
}

export type AppAPI = Hono<AppEnv, {}, typeof BASE_PATH>
