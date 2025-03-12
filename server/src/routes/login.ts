import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import { z } from "zod"

import Usuario from "../db/models"
import { zValidator } from "../lib/validator-wrapper"

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
})

export default new Hono().post("/", zValidator("json", loginSchema), async (c) => {
	const { email } = c.req.valid("json")

	const u = await Usuario.findOne({ email })
	if (!u) {
		throw new HTTPException(404, { message: "Usuario no encontrado" })
	}

	return c.json({ usuario: u._id.toString() }, 200)
})
