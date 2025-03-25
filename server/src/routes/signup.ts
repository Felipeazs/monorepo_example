import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"

import Usuario from "../db/models"
import { signupSchema } from "../db/schemas"
import { ERROR_CODE } from "../lib/constants"
import { captureEvent } from "../lib/posthog"
import { zValidator } from "../lib/validator-wrapper"
import rateLimit from "../middlewares/rate-limit"
import { tryCatch } from "../utils/try-catch"

export default new Hono().post("/", zValidator("json", signupSchema), rateLimit, async (c) => {
	const { email, password, repeat_password } = c.req.valid("json")

	if (password !== repeat_password) {
		throw new Error("Las contraseñas no coinciden")
	}

	const { data: usuarioEncontrado, error: dbFindError } = await tryCatch(
		Usuario.findOne({ email }).lean(),
	)
	if (dbFindError) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: dbFindError.message })
	}
	if (usuarioEncontrado) {
		throw new HTTPException(ERROR_CODE.BAD_REQUEST, {
			message: "El usuario ya se encuentra registrado",
		})
	}

	const { data: hashedPassword, error: hashError } = await tryCatch(
		Bun.password.hash(password, {
			algorithm: "bcrypt",
			cost: 10,
		}),
	)
	if (hashError) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: hashError.message })
	}

	const nuevoUsuario = new Usuario({ email, password: hashedPassword })
	const { data: _data, error: dbError } = await tryCatch(nuevoUsuario.save())
	if (dbError) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: dbError.message })
	}

	captureEvent({ distinct_id: email, event: "signup" })

	return c.json({ usuario: nuevoUsuario.id }, 200)
})
