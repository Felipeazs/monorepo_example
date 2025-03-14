import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"

import Usuario from "../db/models"
import { signupSchema } from "../db/schemas"
import { zValidator } from "../lib/validator-wrapper"

export default new Hono().post("/", zValidator("json", signupSchema), async (c) => {
	const { email, password, repeat_password } = c.req.valid("json")

	const usuarioEncontrado = await Usuario.findOne({ email }).lean()
	if (usuarioEncontrado) {
		throw new HTTPException(400, { message: "El usuario ya existe" })
	}

	if (password !== repeat_password) {
		throw new Error("Las contraseñas no coinciden")
	}

	const hashedPassword = await Bun.password.hash(password, {
		algorithm: "bcrypt",
		cost: 10,
	})

	const nuevoUsuario = new Usuario({ email, password: hashedPassword })
	await nuevoUsuario.save()

	return c.json({ usuario: nuevoUsuario.id }, 200)
})
