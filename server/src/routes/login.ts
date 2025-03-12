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
	const { email, password } = c.req.valid("json")

	const usuarioEncontrado = await Usuario.findOne({ email })
	if (!usuarioEncontrado) {
		throw new HTTPException(404, { message: "Usuario no encontrado" })
	}

	const passValidated = await Bun.password.verify(password, usuarioEncontrado.password)
	if (!passValidated) {
		throw new HTTPException(403, { message: "Credenciales incorrectas" })
	}

	return c.json({ usuario: usuarioEncontrado._id.toString() }, 200)
})
