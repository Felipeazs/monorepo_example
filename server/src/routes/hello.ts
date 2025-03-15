import { Hono } from "hono"

const app = new Hono()

export default app.get("/", async (c) => {
	return c.json({}, 200)
})
