import { Hono } from "hono"
import { deleteCookie } from "hono/cookie"

export default new Hono().post("/", async (c) => {
	deleteCookie(c, "refresh_token")

	return c.json({}, 200)
})
