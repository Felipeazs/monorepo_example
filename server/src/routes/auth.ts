import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"

import type { AppEnv } from "../lib/types"

import { checkAuth } from "../middlewares/auth"

export default new Hono<AppEnv>().get("/", checkAuth, async (c) => {
	const usuario = c.get("usuario")

	if (!usuario) {
		throw new HTTPException(401, { message: "Usuario no autorizado" })
	}

	return c.json({ usuario }, 200)
})
