import { Hono } from "hono"

const app = new Hono()

export const usuario = app.get("/", (c) => {
	return c.json({ title: "Vite-Hono Stack" }, 200)
})

export default app
