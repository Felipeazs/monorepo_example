import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"

import Usuario from "../db/models"
import { loginSchema } from "../db/schemas"
import { generateTokensAndCookies } from "../lib/cookies"
import { captureEvent } from "../lib/posthog"
import { zValidator } from "../lib/validator-wrapper"
import rateLimit from "../middlewares/rate-limit"

export default new Hono().post("/", zValidator("json", loginSchema), rateLimit, async (c) => {
	const { email, password } = c.req.valid("json")

	const usuarioEncontrado = await Usuario.findOne({ email }).lean()
	if (!usuarioEncontrado) {
		throw new HTTPException(404, { message: "Usuario no encontrado" })
	}

	const passValidado = await Bun.password.verify(password, usuarioEncontrado.password)
	if (!passValidado) {
		throw new HTTPException(403, { message: "Credenciales incorrectas" })
	}

	const usuario = {
		id: usuarioEncontrado._id.toString(),
		email,
	}

	const { access_token } = await generateTokensAndCookies(c, usuario)

	captureEvent({
		distinct_id: email,
		event: "login",
	})

	return c.json({ access_token }, 200)
})
