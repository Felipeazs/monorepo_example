import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"

import type { AppEnv } from "../lib/types"

import { auth } from "../middlewares/auth"

export default new Hono<AppEnv>().get("/", auth, async (c) => {
	const user = c.get("user")

	if (!user) {
		throw new HTTPException(403, { message: "Usuario no autorizado" })
	}

	return c.json({ user }, 200)
})
