import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"

import Usuario from "../db/models"
import { signupSchema } from "../db/schemas"
import { captureEvent } from "../lib/posthog"
import { zValidator } from "../lib/validator-wrapper"
import rateLimit from "../middlewares/rate-limit"

export default new Hono().post("/", zValidator("json", signupSchema), rateLimit, async (c) => {
	const { email, password, repeat_password } = c.req.valid("json")

	if (password !== repeat_password) {
		throw new Error("Las contraseñas no coinciden")
	}

	const usuarioEncontrado = await Usuario.findOne({ email }).lean()
	if (usuarioEncontrado) {
		throw new HTTPException(400, { message: "El usuario ya existe" })
	}

	const hashedPassword = await Bun.password.hash(password, {
		algorithm: "bcrypt",
		cost: 10,
	})

	const nuevoUsuario = new Usuario({ email, password: hashedPassword })
	await nuevoUsuario.save()

	captureEvent({ distinct_id: email, event: "signup" })

	return c.json({ usuario: nuevoUsuario.id }, 200)
})
