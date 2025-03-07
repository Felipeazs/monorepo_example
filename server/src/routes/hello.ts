import { Hono } from "hono"
// import { HTTPException } from "hono/http-exception"

export default new Hono().get("/", (c) => {
	// throw new HTTPException(500, { message: "Internal server error" })

	return c.json({ message: "Vite-Hono Stack" }, 200)
})
