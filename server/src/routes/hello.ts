import { Hono } from "hono"

export default new Hono().get("/", (c) => {
	return c.json({ title: "Vite-Hono Stack" }, 200)
})
