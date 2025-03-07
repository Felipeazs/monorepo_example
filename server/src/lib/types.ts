import type { Hono } from "hono"
import type { SecureHeadersVariables } from "hono/secure-headers"

import type { BASE_PATH } from "./constants"

type Variables = SecureHeadersVariables

export type AppEnv = {
	Variables: Variables
	Bindings: {
		AUTH_SECRET: string
	}
}

export type AppAPI = Hono<AppEnv, {}, typeof BASE_PATH>
