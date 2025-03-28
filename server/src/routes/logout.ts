import { Hono } from "hono"
import { deleteCookie } from "hono/cookie"

import type { AppEnv } from "../lib/types"

export default new Hono<AppEnv>().post("/", async (c) => {
	deleteCookie(c, "refresh_token")

	return c.json({ status: "ok" }, 200)
})
