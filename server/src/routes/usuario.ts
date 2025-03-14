import { Hono } from "hono"

import type { AppEnv } from "../lib/types"

import { auth } from "../middlewares/auth"

export default new Hono<AppEnv>().get("/", auth, async (c) => {
	const user = c.get("user")

	return c.json({ user }, 200)
})
