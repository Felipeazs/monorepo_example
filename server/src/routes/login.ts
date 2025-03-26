import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"

import type { EnvUsuario } from "../lib/types"

import Usuario from "../db/models"
import { loginSchema } from "../db/schemas"
import { ERROR_CODE } from "../lib/constants"
import { generateTokensAndCookies } from "../lib/cookies"
import { captureEvent } from "../lib/posthog"
import { zValidator } from "../lib/validator-wrapper"
import rateLimit from "../middlewares/rate-limit"
import { tryCatch } from "../utils/try-catch"

export default new Hono().post("/", zValidator("json", loginSchema), rateLimit, async (c) => {
	const { email, password } = c.req.valid("json")

	const { data: usuarioEncontrado, error: dbError } = await tryCatch(
		Usuario.findOne({ email }).lean(),
	)
	if (dbError) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: dbError.message })
	}

	if (!usuarioEncontrado) {
		throw new HTTPException(ERROR_CODE.NOT_FOUND, { message: "Usuario no registrado" })
	}

	const { data: passValidado, error: passError } = await tryCatch(
		Bun.password.verify(password, usuarioEncontrado.password),
	)
	if (passError) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: passError.message })
	}

	if (!passValidado) {
		throw new HTTPException(ERROR_CODE.FORBIDDEN, { message: "Credenciales incorrectas" })
	}

	const usuario: EnvUsuario = {
		id: usuarioEncontrado._id.toString(),
		roles: usuarioEncontrado.roles ?? ["user"],
	}

	const { data: tokens, error: tokenError } = await tryCatch(generateTokensAndCookies(c, usuario))
	if (tokenError || !tokens) {
		throw new HTTPException(ERROR_CODE.INTERNAL_SERVER_ERROR, { message: tokenError.message })
	}

	captureEvent({
		distinct_id: email,
		event: "login",
	})

	return c.json({ access_token: tokens.access_token }, 200)
})
